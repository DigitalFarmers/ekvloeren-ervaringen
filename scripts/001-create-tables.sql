-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  name TEXT,
  contact TEXT NOT NULL,
  city TEXT,
  date_of_incident TEXT,
  amount DECIMAL(10, 2),
  payment_method TEXT,
  description TEXT NOT NULL,
  consent BOOLEAN DEFAULT FALSE NOT NULL
);

-- Create report_files table
CREATE TABLE IF NOT EXISTS report_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size DECIMAL,
  file_type TEXT
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_report_files_report_id ON report_files(report_id);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);
