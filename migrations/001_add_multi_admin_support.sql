-- Migration: Add multi-admin support
-- Created: 2026-01-27

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);

-- Add admin tracking to reports table
ALTER TABLE reports ADD COLUMN IF NOT EXISTS created_by_admin_id UUID REFERENCES admin_users(id);
ALTER TABLE reports ADD COLUMN IF NOT EXISTS updated_by_admin_id UUID REFERENCES admin_users(id);
ALTER TABLE reports ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_reports_created_by ON reports(created_by_admin_id);
CREATE INDEX IF NOT EXISTS idx_reports_updated_by ON reports(updated_by_admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Create trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_reports_updated_at ON reports;
CREATE TRIGGER update_reports_updated_at
    BEFORE UPDATE ON reports
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
