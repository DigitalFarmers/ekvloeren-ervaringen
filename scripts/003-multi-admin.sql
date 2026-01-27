-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add admin_id to reports
ALTER TABLE reports ADD COLUMN IF NOT EXISTS admin_id UUID REFERENCES users(id);

-- Insert initial users
-- Passwords: 
-- motouzani: admin123
-- bowien: bowien123
INSERT INTO users (username, password_hash, full_name, role)
VALUES 
('motouzani', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'Admin', 'superadmin')
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, password_hash, full_name, role)
VALUES 
('bowien', 'f6e0b036ef5fc692ae9a7e3ffc5dd57c5dbd3f90845dafb3e7eb1c7d0a39a28c', 'Bowien', 'admin')
ON CONFLICT (username) DO NOTHING;
