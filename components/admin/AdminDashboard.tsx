"use client";

import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import AdminLogin from "./AdminLogin";
import LeadTable from "./LeadTable";
import LeadDetail from "./LeadDetail";
import SettingsEditor from "./SettingsEditor";
import type { Lead } from "@/lib/types";
import { cn, getAdminUrlDisplay } from "@/lib/utils";

type Tab = "leads" | "settings";

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("leads");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((res) => setAuthenticated(res.ok))
      .catch(() => setAuthenticated(false));
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    setSelectedLead(null);
  }

  if (authenticated === null) {
    return (
      <div className="py-16 text-center text-charcoal-muted">
        Checking session…
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Owner Dashboard</h1>
          <p className="text-sm text-charcoal-muted">
            Manage quote requests and site settings
          </p>
          <p className="mt-1 text-xs text-charcoal-muted">
            Bookmark: <span className="font-medium text-charcoal">{getAdminUrlDisplay()}</span>
          </p>
        </div>
        <button type="button" onClick={handleLogout} className="btn-secondary text-sm">
          <LogOut className="h-4 w-4" aria-hidden />
          Sign Out
        </button>
      </div>

      <div className="mt-6 border-b border-gray-200">
        <nav className="-mb-px flex gap-6" aria-label="Dashboard tabs">
          {(["leads", "settings"] as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "border-b-2 pb-3 text-sm font-semibold capitalize transition-colors",
                activeTab === tab
                  ? "border-brand-600 text-brand-600"
                  : "border-transparent text-charcoal-muted hover:text-charcoal"
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === "leads" ? (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className={selectedLead ? "lg:col-span-2" : "lg:col-span-3"}>
              <LeadTable
                onSelectLead={setSelectedLead}
                selectedLeadId={selectedLead?.id ?? null}
              />
            </div>
            {selectedLead && (
              <div className="lg:col-span-1">
                <LeadDetail
                  lead={selectedLead}
                  onClose={() => setSelectedLead(null)}
                />
              </div>
            )}
          </div>
        ) : (
          <SettingsEditor />
        )}
      </div>
    </div>
  );
}
