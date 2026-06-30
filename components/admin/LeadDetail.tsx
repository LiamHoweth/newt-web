"use client";

import { X } from "lucide-react";
import type { Lead } from "@/lib/types";
import { formatDate, formatTimingLabel } from "@/lib/utils";

interface LeadDetailProps {
  lead: Lead;
  onClose: () => void;
}

export default function LeadDetail({ lead, onClose }: LeadDetailProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h3 className="font-bold text-charcoal">{lead.name}</h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-charcoal-muted hover:bg-gray-100"
          aria-label="Close lead details"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <dl className="space-y-3 px-5 py-4 text-sm">
        <div>
          <dt className="font-medium text-charcoal-muted">Phone</dt>
          <dd>
            <a href={`tel:${lead.phone}`} className="text-brand-600 hover:underline">
              {lead.phone}
            </a>
          </dd>
        </div>
        {lead.email && (
          <div>
            <dt className="font-medium text-charcoal-muted">Email</dt>
            <dd>
              <a href={`mailto:${lead.email}`} className="text-brand-600 hover:underline">
                {lead.email}
              </a>
            </dd>
          </div>
        )}
        <div>
          <dt className="font-medium text-charcoal-muted">Services</dt>
          <dd>{lead.services.join(", ")}</dd>
        </div>
        <div>
          <dt className="font-medium text-charcoal-muted">Address / ZIP</dt>
          <dd>{lead.addressOrZip}</dd>
        </div>
        <div>
          <dt className="font-medium text-charcoal-muted">Preferred timing</dt>
          <dd>
            {formatTimingLabel(lead.preferredTiming)}
            {lead.specificDate && ` — ${lead.specificDate}`}
          </dd>
        </div>
        {lead.trashCanCount != null && (
          <div>
            <dt className="font-medium text-charcoal-muted">Trash cans</dt>
            <dd>{lead.trashCanCount}</dd>
          </div>
        )}
        {lead.notes && (
          <div>
            <dt className="font-medium text-charcoal-muted">Notes</dt>
            <dd className="whitespace-pre-wrap">{lead.notes}</dd>
          </div>
        )}
        {lead.photoUrls.length > 0 && (
          <div>
            <dt className="font-medium text-charcoal-muted">Photos</dt>
            <dd className="mt-1 flex flex-wrap gap-2">
              {lead.photoUrls.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline"
                >
                  View photo
                </a>
              ))}
            </dd>
          </div>
        )}
        <div>
          <dt className="font-medium text-charcoal-muted">Consent to contact</dt>
          <dd>{lead.consentToContact ? "Yes" : "No"}</dd>
        </div>
        <div>
          <dt className="font-medium text-charcoal-muted">Submitted</dt>
          <dd>{formatDate(lead.createdAt)}</dd>
        </div>
        <div>
          <dt className="font-medium text-charcoal-muted">Status</dt>
          <dd className="capitalize">{lead.status}</dd>
        </div>
      </dl>
    </div>
  );
}
