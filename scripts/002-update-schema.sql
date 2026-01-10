-- Add new columns to reports table
ALTER TABLE reports 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' NOT NULL,
ADD COLUMN IF NOT EXISTS social_profile_url TEXT,
ADD COLUMN IF NOT EXISTS link_to_report_id UUID REFERENCES reports(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS internal_notes TEXT;

-- Create settings table for counter adjustment
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_contact ON reports(contact);
CREATE INDEX IF NOT EXISTS idx_reports_city ON reports(city);

-- Insert default counter adjustment
INSERT INTO settings (key, value) VALUES ('counter_adjustment', '0')
ON CONFLICT (key) DO NOTHING;
