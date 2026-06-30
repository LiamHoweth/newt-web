import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { getSupabaseAdmin, isSupabaseConfigured } from "./supabase";
import type { Lead, LeadStatus, SiteSettings } from "./types";
import { DEFAULT_SETTINGS } from "./types";
import { isPlaceholderEmail } from "./instagram";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

// --- Supabase row mappers ---

function rowToLead(row: Record<string, unknown>): Lead {
  return {
    id: row.id as string,
    createdAt: row.created_at as string,
    status: row.status as LeadStatus,
    name: row.name as string,
    phone: row.phone as string,
    email: (row.email as string) || null,
    services: (row.services as string[]) ?? [],
    addressOrZip: row.address_or_zip as string,
    preferredTiming: row.preferred_timing as Lead["preferredTiming"],
    specificDate: (row.specific_date as string) || null,
    trashCanCount: row.trash_can_count as number | null,
    notes: (row.notes as string) || null,
    photoUrls: (row.photo_urls as string[]) ?? [],
    consentToContact: row.consent_to_contact as boolean,
    source: "website",
  };
}

function leadToRow(lead: Omit<Lead, "id" | "createdAt" | "source"> & { id?: string; createdAt?: string }) {
  return {
    id: lead.id,
    created_at: lead.createdAt,
    status: lead.status,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    services: lead.services,
    address_or_zip: lead.addressOrZip,
    preferred_timing: lead.preferredTiming,
    specific_date: lead.specificDate ?? null,
    trash_can_count: lead.trashCanCount,
    notes: lead.notes,
    photo_urls: lead.photoUrls,
    consent_to_contact: lead.consentToContact,
    source: "website",
  };
}

// --- Local file fallback ---

function normalizeSettings(stored: Partial<SiteSettings>): SiteSettings {
  const merged = {
    ...DEFAULT_SETTINGS,
    ...stored,
    services: stored.services?.length
      ? stored.services
      : DEFAULT_SETTINGS.services,
  };

  if (isPlaceholderEmail(merged.email)) {
    merged.email = "";
  }

  return merged;
}

async function readLocalLeads(): Promise<Lead[]> {
  try {
    await ensureDataDir();
    const raw = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

async function writeLocalLeads(leads: Lead[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
}

async function readLocalSettings(): Promise<SiteSettings> {
  try {
    await ensureDataDir();
    const raw = await fs.readFile(SETTINGS_FILE, "utf-8");
    const stored = JSON.parse(raw) as SiteSettings;
    return normalizeSettings(stored);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

async function writeLocalSettings(settings: SiteSettings): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2));
}

// --- Public API ---

export async function createLead(
  data: Omit<Lead, "id" | "createdAt" | "status" | "source">
): Promise<Lead> {
  const lead: Lead = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    status: "new",
    source: "website",
  };

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("leads").insert(leadToRow(lead));
    if (error) throw new Error(`Failed to save lead: ${error.message}`);
    return lead;
  }

  const leads = await readLocalLeads();
  leads.unshift(lead);
  await writeLocalLeads(leads);
  return lead;
}

export async function getLeads(filters?: {
  status?: LeadStatus;
  service?: string;
  search?: string;
}): Promise<Lead[]> {
  const supabase = getSupabaseAdmin();
  let leads: Lead[];

  if (supabase) {
    let query = supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.status) {
      query = query.eq("status", filters.status);
    }
    if (filters?.service) {
      query = query.contains("services", [filters.service]);
    }

    const { data, error } = await query;
    if (error) throw new Error(`Failed to fetch leads: ${error.message}`);
    leads = (data ?? []).map(rowToLead);
  } else {
    leads = await readLocalLeads();
    if (filters?.status) {
      leads = leads.filter((l) => l.status === filters.status);
    }
    if (filters?.service) {
      leads = leads.filter((l) => l.services.includes(filters.service!));
    }
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    leads = leads.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        (l.email?.toLowerCase().includes(q) ?? false)
    );
  }

  return leads;
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("id", id)
      .single();
    if (error || !data) return null;
    return rowToLead(data);
  }

  const leads = await readLocalLeads();
  return leads.find((l) => l.id === id) ?? null;
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus
): Promise<Lead | null> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data, error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error || !data) return null;
    return rowToLead(data);
  }

  const leads = await readLocalLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  leads[idx] = { ...leads[idx], status };
  await writeLocalLeads(leads);
  return leads[idx];
}

export async function getSettings(): Promise<SiteSettings> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", "default")
      .single();

    if (error || !data) {
      // Seed default row if missing
      await supabase.from("site_settings").upsert({
        id: "default",
        settings: DEFAULT_SETTINGS,
      });
      return DEFAULT_SETTINGS;
    }
    const stored = data.settings as SiteSettings;
    return normalizeSettings(stored);
  }

  return readLocalSettings();
}

export async function updateSettings(
  settings: SiteSettings
): Promise<SiteSettings> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("site_settings").upsert({
      id: "default",
      settings,
      updated_at: new Date().toISOString(),
    });
    if (error) throw new Error(`Failed to save settings: ${error.message}`);
    return settings;
  }

  await writeLocalSettings(settings);
  return settings;
}

export function getStorageMode(): "supabase" | "local" {
  return isSupabaseConfigured() ? "supabase" : "local";
}
