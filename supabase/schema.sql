-- ========================================================
-- Supabase SQL Schema for BD Edu PDF & Book Portal
-- Supported for Cloudinary Images & Google Drive PDF Links
-- ========================================================

-- 1. Create Main Books Table
CREATE TABLE IF NOT EXISTS books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  class_name TEXT NOT NULL,
  class_slug TEXT NOT NULL,
  subject TEXT NOT NULL,
  subject_slug TEXT NOT NULL,
  book_type TEXT NOT NULL CHECK (book_type IN ('textbook', 'guide', 'solution', 'other')),
  year INT NOT NULL DEFAULT 2026,
  description TEXT,
  cover_image TEXT, -- Cloudinary or external image URL (e.g. https://res.cloudinary.com/...)
  pdf_url TEXT NOT NULL, -- Google Drive PDF link
  file_size TEXT DEFAULT 'PDF',
  author TEXT DEFAULT 'NCTB / Education Board',
  publisher TEXT DEFAULT 'BD Edu Library',
  is_published BOOLEAN DEFAULT true,
  is_latest BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Performance & SEO Database Indexing
CREATE INDEX IF NOT EXISTS idx_books_slug ON books(slug);
CREATE INDEX IF NOT EXISTS idx_books_class_slug ON books(class_slug);
CREATE INDEX IF NOT EXISTS idx_books_subject_slug ON books(subject_slug);
CREATE INDEX IF NOT EXISTS idx_books_type ON books(book_type);
CREATE INDEX IF NOT EXISTS idx_books_year ON books(year);
CREATE INDEX IF NOT EXISTS idx_books_published ON books(is_published);
CREATE INDEX IF NOT EXISTS idx_books_is_latest ON books(is_latest);

-- 3. Enable Row Level Security (RLS) & Access Policies
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all published books
CREATE POLICY "Allow public read access"
  ON books FOR SELECT
  USING (true);

-- Allow insert access for admin portal
CREATE POLICY "Allow insert access"
  ON books FOR INSERT
  WITH CHECK (true);

-- Allow update access for admin portal
CREATE POLICY "Allow update access"
  ON books FOR UPDATE
  USING (true);

-- Allow delete access for admin portal
CREATE POLICY "Allow delete access"
  ON books FOR DELETE
  USING (true);
