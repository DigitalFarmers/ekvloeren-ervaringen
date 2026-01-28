ALTER TABLE reports ADD COLUMN IF NOT EXISTS defect_category VARCHAR(50);
ALTER TABLE reports ADD COLUMN IF NOT EXISTS defect_details TEXT;

-- Update existing reports to have 'unknown' or 'other' if needed, or leave null
UPDATE reports SET defect_category = 'other' WHERE defect_category IS NULL;
