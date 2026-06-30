-- All4One Exterior Solutions — Supabase schema
-- Run this in the Supabase SQL editor to set up production storage.

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'quoted', 'scheduled', 'won', 'lost')),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  services TEXT[] NOT NULL DEFAULT '{}',
  address_or_zip TEXT NOT NULL,
  preferred_timing TEXT NOT NULL,
  specific_date TEXT,
  trash_can_count INTEGER,
  notes TEXT,
  photo_urls TEXT[] NOT NULL DEFAULT '{}',
  consent_to_contact BOOLEAN NOT NULL DEFAULT FALSE,
  source TEXT NOT NULL DEFAULT 'website'
);

CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);

-- Site settings (single row)
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  settings JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed default settings
INSERT INTO site_settings (id, settings)
VALUES ('default', '{
  "businessName": "All4One Exterior Solutions",
  "tagline": "You say it, we spray it.",
  "phone": "(859) 753-4859",
  "email": "hello@example.com",
  "instagramUrl": "https://www.instagram.com/all4one.exteriorsolutions/",
  "serviceArea": "Purcell, Norman & surrounding OK areas",
  "hours": "Call or PM for availability",
  "announcement": "Same-day or scheduled cleaning available.",
  "showPricing": false,
  "services": []
}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Storage bucket for quote photos (create via Supabase dashboard or API)
-- Bucket name: quote-photos (public read)

-- Row Level Security: disable public access; service role key handles all ops
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- No public policies — all access via service role key on the server
