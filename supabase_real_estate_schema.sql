-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. Create Tables
-- =============================================

-- Agencies table
CREATE TABLE IF NOT EXISTS agencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  agency_id UUID REFERENCES agencies(id) ON DELETE SET NULL,
  price INTEGER NOT NULL,
  listing_type TEXT NOT NULL DEFAULT 'sale', -- 'sale' or 'rent'
  property_type TEXT NOT NULL, -- e.g., 'Apartment', 'Villa'
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  area_sqft INTEGER NOT NULL,
  furnishing TEXT,
  availability_status TEXT DEFAULT 'available',
  year_built INTEGER,
  facing TEXT,
  floor_number INTEGER,
  total_floors INTEGER,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  main_image TEXT,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations table
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  headline VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property-Locations junction table
CREATE TABLE IF NOT EXISTS property_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(property_id, location_id)
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT NOT NULL,
  category TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 2. Create Indexes
-- =============================================

-- Indexes for junction table
CREATE INDEX IF NOT EXISTS property_locations_property_id_idx ON property_locations(property_id);
CREATE INDEX IF NOT EXISTS property_locations_location_id_idx ON property_locations(location_id);

-- Indexes for other entities
CREATE INDEX IF NOT EXISTS blogs_slug_idx ON blogs(slug);
CREATE INDEX IF NOT EXISTS blogs_published_idx ON blogs(published);
CREATE INDEX IF NOT EXISTS locations_slug_idx ON locations(slug);
CREATE INDEX IF NOT EXISTS properties_slug_idx ON properties(slug);
CREATE INDEX IF NOT EXISTS properties_agency_id_idx ON properties(agency_id);

-- =============================================
-- 3. Enable Row Level Security (RLS)
-- =============================================

ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 4. Create Security Policies
-- =============================================

-- Public read access policies
CREATE POLICY "Allow public read access for agencies" 
  ON agencies FOR SELECT USING (true);

CREATE POLICY "Allow public read access for properties" 
  ON properties FOR SELECT USING (true);

CREATE POLICY "Allow public read access for locations" 
  ON locations FOR SELECT USING (true);

CREATE POLICY "Allow public read access for property_locations" 
  ON property_locations FOR SELECT USING (true);

CREATE POLICY "Allow public read access for testimonials" 
  ON testimonials FOR SELECT USING (true);

CREATE POLICY "Allow public read access for blogs" 
  ON blogs FOR SELECT USING (published = true);

-- Contact form submission policy
CREATE POLICY "Allow public to insert contact messages" 
  ON contact_messages FOR INSERT WITH CHECK (true);

-- Admin access policies
CREATE POLICY "Enable all for admin users"
  ON ALL TABLES
  FOR ALL
  TO service_role;

-- =============================================
-- 5. Create Storage Buckets
-- =============================================

-- Create property-images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create agency-logos bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('agency-logos', 'agency-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Create blog-images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for property-images
CREATE POLICY "Public Access for property images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload property images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'property-images' AND
    (auth.role() = 'authenticated' OR auth.role() = 'service_role')
  );

CREATE POLICY "Users can update property images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'property-images' AND
    (auth.role() = 'authenticated' OR auth.role() = 'service_role')
  );

CREATE POLICY "Users can delete property images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'property-images' AND
    (auth.role() = 'authenticated' OR auth.role() = 'service_role')
  );

-- Storage policies for agency-logos
CREATE POLICY "Public Access for agency logos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'agency-logos');

CREATE POLICY "Authenticated users can upload agency logos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'agency-logos' AND
    (auth.role() = 'authenticated' OR auth.role() = 'service_role')
  );

-- Storage policies for blog-images
CREATE POLICY "Public Access for blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'blog-images' AND
    (auth.role() = 'authenticated' OR auth.role() = 'service_role')
  );

CREATE POLICY "Users can update their own blog images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'blog-images' AND
    (auth.role() = 'authenticated' OR auth.role() = 'service_role')
  );

CREATE POLICY "Users can delete their own blog images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'blog-images' AND
    (auth.role() = 'authenticated' OR auth.role() = 'service_role')
  );

-- =============================================
-- 6. Create Helper Functions
-- =============================================

-- updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON blogs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_locations_updated_at
BEFORE UPDATE ON locations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 7. Add Comments
-- =============================================

COMMENT ON TABLE agencies IS 'Real estate agencies or developers';
COMMENT ON TABLE properties IS 'Properties listed for sale or rent';
COMMENT ON TABLE locations IS 'Geographical locations of properties';
COMMENT ON TABLE property_locations IS 'Junction table mapping properties to multiple locations';
COMMENT ON TABLE testimonials IS 'Customer testimonials and reviews';
COMMENT ON TABLE contact_messages IS 'Messages submitted through the contact form';
COMMENT ON TABLE blogs IS 'Blog posts for the real estate website';

-- =============================================
-- 8. Grant Permissions
-- =============================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON contact_messages TO anon, authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Storage permissions
GRANT SELECT ON storage.objects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON storage.objects TO authenticated;

-- =============================================
-- 9. Enable Realtime (Optional)
-- =============================================

-- Uncomment to enable realtime
/*
ALTER PUBLICATION supabase_realtime ADD TABLE blogs;
ALTER PUBLICATION supabase_realtime ADD TABLE properties;
*/

-- =============================================
-- 10. Sample Data (Optional)
-- =============================================

-- Insert sample agencies
INSERT INTO agencies (name, logo) VALUES
  ('Prestige Group', '/images/agencies/prestige.png'),
  ('Brigade Group', '/images/agencies/brigade.png'),
  ('Sobha Limited', '/images/agencies/sobha.png'),
  ('Godrej Properties', '/images/agencies/godrej.png'),
  ('DLF Limited', '/images/agencies/dlf.png')
ON CONFLICT DO NOTHING;

-- Insert sample locations
INSERT INTO locations (name, slug, headline, content) VALUES
  ('Whitefield', 'whitefield', 'IT Hub of Bangalore', 'Whitefield is one of the most sought-after residential areas in Bangalore, known for its excellent connectivity and modern infrastructure.'),
  ('Koramangala', 'koramangala', 'Startup Capital', 'Koramangala is a vibrant neighborhood known for its startup ecosystem and excellent dining options.'),
  ('HSR Layout', 'hsr-layout', 'Premium Residential Area', 'HSR Layout offers a perfect blend of modern amenities and peaceful living.'),
  ('Electronic City', 'electronic-city', 'Tech Corridor', 'Electronic City is a major IT hub with excellent infrastructure and connectivity.'),
  ('Indiranagar', 'indiranagar', 'Cultural Heart', 'Indiranagar is known for its cultural vibrancy and premium residential options.')
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (name, location, rating, comment, image) VALUES
  ('Rajesh Kumar', 'Bangalore', 5, 'Excellent service and helped me find my dream home in Whitefield. The team was very professional and responsive.', '/images/testimonials/rajesh.jpg'),
  ('Priya Sharma', 'Hyderabad', 5, 'Very satisfied with the property recommendations. Found a great investment opportunity in HSR Layout.', '/images/testimonials/priya.jpg'),
  ('Amit Patel', 'Mumbai', 4, 'Good experience overall. The property details were accurate and the process was smooth.', '/images/testimonials/amit.jpg')
ON CONFLICT DO NOTHING; 