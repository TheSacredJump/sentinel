-- Ensure UUID extension is enabled for user IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    google_id VARCHAR(255) UNIQUE NOT NULL,
    google_email VARCHAR(255) UNIQUE NOT NULL,
    oauth_token JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create emails table
CREATE TABLE IF NOT EXISTS emails (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) REFERENCES accounts(google_id) ON DELETE CASCADE,
    email_id VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100),
    received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create attachments table
CREATE TABLE IF NOT EXISTS attachments (
    id SERIAL PRIMARY KEY,
    email_id INT REFERENCES emails(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    mime_type VARCHAR(100),
    size INT
);

-- Indexes for fast searching
CREATE INDEX IF NOT EXISTS idx_emails_google ON emails(google_id);
CREATE INDEX IF NOT EXISTS idx_emails_received ON emails(received_at DESC);
