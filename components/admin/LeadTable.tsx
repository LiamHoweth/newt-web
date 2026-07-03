"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  RefreshCw,
  Loader2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/types";
import { LEAD_STATUSES } from "@/lib/types";
import { formatDate, formatTimingLabel, cn } from "@/lib/utils";
const statusColors: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  quoted: "bg-purple-100 text-purple-800",
  scheduled: "bg-indigo-100 text-indigo-800",
  won: "bg-brand-100 text-brand-800",
  lost: "bg-gray-100 text-gray-600",
};

interface LeadTableProps {
  onSelectLead: (lead: Lead | null) => void;
  selectedLeadId: string | null;
}

export default function LeadTable({
  onSelectLead,
  selectedLeadId,
}: LeadTableProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "">("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [search, setSearch] = useState("");

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (serviceFilter) params.set("service", serviceFilter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/leads?${params}`);
      if (!res.ok) throw new Error("Failed to load leads");
      const data = await res.json();
      setLeads(data.leads);
    } catch {
      setError("Could not load leads. Try refreshing.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, serviceFilter, search]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  async function updateStatus(id: string, status: LeadStatus) {
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const data = await res.json();
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? data.lead : l))
      );
      if (selectedLeadId === id) {
        onSelectLead(data.lead);
      }
    }
  }

  const allServices = Array.from(
    new Set(leads.flatMap((l) => l.services))
  ).sort();

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden />
          <input
            type="search"
            placeholder="Search by name, phone, or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "")}
            className="input-field w-auto"
            aria-label="Filter by status"
          >
            <option value="">All statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="input-field w-auto"
            aria-label="Filter by service"
          >
            <option value="">All services</option>
            {allServices.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={fetchLeads}
            className="btn-secondary px-3"
            aria-label="Refresh leads"
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-charcoal-muted">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden />
          Loading leads…
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-8 text-red-700">
          <AlertCircle className="h-5 w-5 shrink-0" aria-hidden />
          {error}
        </div>
      ) : leads.length === 0 ? (
        <div className="rounded-md border border-gray-200 bg-gray-50 px-4 py-12 text-center text-charcoal-muted">
          No leads yet. Quote requests will appear here.
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-charcoal">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-charcoal">Phone</th>
                <th className="hidden px-4 py-3 text-left font-semibold text-charcoal md:table-cell">Services</th>
                <th className="hidden px-4 py-3 text-left font-semibold text-charcoal sm:table-cell">Timing</th>
                <th className="px-4 py-3 text-left font-semibold text-charcoal">Status</th>
                <th className="hidden px-4 py-3 text-left font-semibold text-charcoal lg:table-cell">Submitted</th>
                <th className="px-4 py-3"><span className="sr-only">View</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className={cn(
                    "hover:bg-gray-50",
                    selectedLeadId === lead.id && "bg-brand-50"
                  )}
                >
                  <td className="px-4 py-3 font-medium">{lead.name}</td>
                  <td className="px-4 py-3">
                    <a href={`tel:${lead.phone}`} className="text-brand-600 hover:underline">
                      {lead.phone}
                    </a>
                  </td>
                  <td className="hidden max-w-[200px] truncate px-4 py-3 text-charcoal-muted md:table-cell">
                    {lead.services.join(", ")}
                  </td>
                  <td className="hidden px-4 py-3 text-charcoal-muted sm:table-cell">
                    {formatTimingLabel(lead.preferredTiming)}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        updateStatus(lead.id, e.target.value as LeadStatus)
                      }
                      className={cn(
                        "rounded-full border-0 px-2.5 py-1 text-xs font-semibold capitalize",
                        statusColors[lead.status]
                      )}
                      aria-label={`Status for ${lead.name}`}
                    >
                      {LEAD_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="hidden px-4 py-3 text-charcoal-muted lg:table-cell">
                    {formatDate(lead.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onSelectLead(lead)}
                      className="text-brand-600 hover:text-brand-700"
                      aria-label={`View details for ${lead.name}`}
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
