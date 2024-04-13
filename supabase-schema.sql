-- supabase-schema.sql

-- Create a table for users
CREATE TABLE users (
    id UUID PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    name TEXT,
    email VARCHAR(255) UNIQUE NOT NULL,
    role TEXT
);

-- Create a table for year
CREATE TABLE year (
    id BIGINT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    name TEXT,
    weight BIGINT,
    user_id UUID REFERENCES users(id)
);

-- Create a table for module
CREATE TABLE module (
    id BIGINT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    name TEXT,
    credit TEXT,
    user_id UUID REFERENCES users(id),
    year_id BIGINT REFERENCES year(id)
);
-- Create a table for assignment
CREATE TABLE Assignment (
    id BIGINT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    name TEXT,
    type TEXT,
    weight BIGINT,
    grade BIGINT,
    module_id BIGINT REFERENCES module(id),
    user_id UUID REFERENCES users(id)
);