"use client";

import { useState, useEffect, FormEvent } from "react";
import { Loader2, Save, CheckCircle } from "lucide-react";
import type { SiteSettings } from "@/lib/types";
import { DEFAULT_SERVICES } from "@/lib/types";

export default function SettingsEditor() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data.settings);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load settings");
        setLoading(false);
      });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  function toggleService(id: string) {
    if (!settings) return;
    setSettings({
      ...settings,
      services: settings.services.map((s) =>
        s.id === id ? { ...s, enabled: !s.enabled } : s
      ),
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-charcoal-muted">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden />
        Loading settings…
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 px-4 py-6 text-red-700">
        {error || "Could not load settings"}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      )}
      {saved && (
        <div className="flex items-center gap-2 rounded-md bg-brand-50 px-3 py-2 text-sm text-brand-700">
          <CheckCircle className="h-4 w-4" aria-hidden />
          Settings saved
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="businessName" className="label-text">Business name</label>
          <input
            id="businessName"
            value={settings.businessName}
            onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="tagline" className="label-text">Tagline</label>
          <input
            id="tagline"
            value={settings.tagline}
            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="phone" className="label-text">Phone</label>
          <input
            id="phone"
            value={settings.phone}
            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="email" className="label-text">Email</label>
          <input
            id="email"
            type="email"
            value={settings.email}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="serviceArea" className="label-text">Service area</label>
          <input
            id="serviceArea"
            value={settings.serviceArea}
            onChange={(e) => setSettings({ ...settings, serviceArea: e.target.value })}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="hours" className="label-text">Hours</label>
          <input
            id="hours"
            value={settings.hours}
            onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="announcement" className="label-text">
          Homepage announcement
        </label>
        <input
          id="announcement"
          value={settings.announcement}
          onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
          className="input-field"
          placeholder="Same-day or scheduled cleaning available."
        />
      </div>

      <div>
        <label htmlFor="instagramUrl" className="label-text">Instagram URL</label>
        <input
          id="instagramUrl"
          value={settings.instagramUrl}
          onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
          className="input-field"
        />
      </div>

      <fieldset>
        <legend className="label-text">Services enabled</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {(settings.services.length ? settings.services : DEFAULT_SERVICES).map(
            (service) => (
              <label
                key={service.id}
                className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={service.enabled}
                  onChange={() => toggleService(service.id)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-600"
                />
                {service.name}
              </label>
            )
          )}
        </div>
      </fieldset>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={settings.showPricing}
          onChange={(e) =>
            setSettings({ ...settings, showPricing: e.target.checked })
          }
          className="h-4 w-4 rounded border-gray-300 text-brand-600"
        />
        Show pricing on site (when configured)
      </label>

      <button type="submit" disabled={saving} className="btn-primary">
        {saving ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Saving…
          </>
        ) : (
          <>
            <Save className="h-4 w-4" aria-hidden />
            Save Settings
          </>
        )}
      </button>
    </form>
  );
}
