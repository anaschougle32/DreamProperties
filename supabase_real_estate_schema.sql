-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. Create Tables
-- =============================================

-- Properties table (single vendor - Dream House Properties)
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  price INTEGER NOT NULL,
  listing_type TEXT NOT NULL DEFAULT 'sale', -- 'sale' or 'rent'
  property_type TEXT NOT NULL, -- e.g., 'Apartment', 'Villa', 'Independent House', 'Duplex'
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  area_sqft INTEGER NOT NULL,
  furnishing TEXT, -- 'Furnished', 'Semi-Furnished', 'Unfurnished'
  availability_status TEXT DEFAULT 'available', -- 'available', 'sold', 'rented', 'under_negotiation'
  year_built INTEGER,
  facing TEXT, -- 'North', 'South', 'East', 'West', 'North-East', etc.
  floor_number INTEGER,
  total_floors INTEGER,
  description TEXT,
  features TEXT[] DEFAULT '{}', -- ['Parking', 'Gym', 'Swimming Pool', 'Security', 'Power Backup']
  amenities TEXT[] DEFAULT '{}', -- ['Club House', 'Garden', 'Children Play Area', 'Jogging Track']
  main_image TEXT,
  images TEXT[] DEFAULT '{}',
  video_tour TEXT, -- YouTube or video URL
  virtual_tour TEXT, -- 360° tour URL
  is_featured BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations table (areas/neighborhoods)
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  headline VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  city VARCHAR(255) NOT NULL DEFAULT 'Bangalore',
  state VARCHAR(255) NOT NULL DEFAULT 'Karnataka',
  pincode VARCHAR(10),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  image TEXT,
  is_popular BOOLEAN DEFAULT false,
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
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  image TEXT,
  property_type TEXT, -- What type of property they bought/rented
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  inquiry_type TEXT DEFAULT 'general', -- 'general', 'property_inquiry', 'viewing_request', 'callback_request'
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'closed'
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
  author TEXT NOT NULL DEFAULT 'Dream House Properties',
  category TEXT, -- 'Buying Guide', 'Market News', 'Investment Tips', 'Location Spotlight'
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property Views/Analytics table
CREATE TABLE IF NOT EXISTS property_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  ip_address INET,
  user_agent TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 2. Create Indexes
-- =============================================

-- Property indexes
CREATE INDEX IF NOT EXISTS properties_slug_idx ON properties(slug);
CREATE INDEX IF NOT EXISTS properties_listing_type_idx ON properties(listing_type);
CREATE INDEX IF NOT EXISTS properties_property_type_idx ON properties(property_type);
CREATE INDEX IF NOT EXISTS properties_price_idx ON properties(price);
CREATE INDEX IF NOT EXISTS properties_bedrooms_idx ON properties(bedrooms);
CREATE INDEX IF NOT EXISTS properties_is_featured_idx ON properties(is_featured);
CREATE INDEX IF NOT EXISTS properties_availability_status_idx ON properties(availability_status);

-- Location indexes
CREATE INDEX IF NOT EXISTS locations_slug_idx ON locations(slug);
CREATE INDEX IF NOT EXISTS locations_city_idx ON locations(city);
CREATE INDEX IF NOT EXISTS locations_is_popular_idx ON locations(is_popular);

-- Junction table indexes
CREATE INDEX IF NOT EXISTS property_locations_property_id_idx ON property_locations(property_id);
CREATE INDEX IF NOT EXISTS property_locations_location_id_idx ON property_locations(location_id);

-- Blog indexes
CREATE INDEX IF NOT EXISTS blogs_slug_idx ON blogs(slug);
CREATE INDEX IF NOT EXISTS blogs_published_idx ON blogs(published);
CREATE INDEX IF NOT EXISTS blogs_category_idx ON blogs(category);
CREATE INDEX IF NOT EXISTS blogs_is_featured_idx ON blogs(is_featured);

-- Analytics indexes
CREATE INDEX IF NOT EXISTS property_views_property_id_idx ON property_views(property_id);
CREATE INDEX IF NOT EXISTS property_views_viewed_at_idx ON property_views(viewed_at);

-- =============================================
-- 3. Enable Row Level Security (RLS)
-- =============================================

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_views ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 4. Create Security Policies
-- =============================================

-- Public read access policies
CREATE POLICY "Allow public read access for properties" 
  ON properties FOR SELECT USING (availability_status = 'available');

CREATE POLICY "Allow public read access for locations" 
  ON locations FOR SELECT USING (true);

CREATE POLICY "Allow public read access for property_locations" 
  ON property_locations FOR SELECT USING (true);

CREATE POLICY "Allow public read access for testimonials" 
  ON testimonials FOR SELECT USING (true);

CREATE POLICY "Allow public read access for published blogs" 
  ON blogs FOR SELECT USING (published = true);

-- Contact form and analytics policies
CREATE POLICY "Allow public to insert contact messages" 
  ON contact_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to insert property views" 
  ON property_views FOR INSERT WITH CHECK (true);

-- Admin access policies (service role)
CREATE POLICY "Enable all for service role"
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

-- Create location-images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('location-images', 'location-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create blog-images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create testimonial-images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('testimonial-images', 'testimonial-images', true)
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

-- Storage policies for location-images
CREATE POLICY "Public Access for location images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'location-images');

-- Storage policies for blog-images
CREATE POLICY "Public Access for blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

-- Storage policies for testimonial-images
CREATE POLICY "Public Access for testimonial images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'testimonial-images');

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

-- Triggers for updated_at
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON properties
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_locations_updated_at
BEFORE UPDATE ON locations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON blogs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Function to get property view count
CREATE OR REPLACE FUNCTION get_property_view_count(property_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (SELECT COUNT(*) FROM property_views WHERE property_id = property_uuid);
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 7. Add Comments
-- =============================================

COMMENT ON TABLE properties IS 'Property listings for Dream House Properties';
COMMENT ON TABLE locations IS 'Geographical locations and neighborhoods';
COMMENT ON TABLE property_locations IS 'Junction table mapping properties to locations';
COMMENT ON TABLE testimonials IS 'Customer testimonials and reviews';
COMMENT ON TABLE contact_messages IS 'Messages and inquiries from website visitors';
COMMENT ON TABLE blogs IS 'Blog posts and articles about real estate';
COMMENT ON TABLE property_views IS 'Analytics for property page views';

-- =============================================
-- 8. Grant Permissions
-- =============================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT ON contact_messages, property_views TO anon, authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Storage permissions
GRANT SELECT ON storage.objects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON storage.objects TO authenticated;

-- =============================================
-- 9. Sample Data for Dream House Properties
-- =============================================

-- Insert sample locations in Bangalore
INSERT INTO locations (name, slug, headline, content, city, state, pincode, is_popular) VALUES
  ('Whitefield', 'whitefield', 'IT Hub of Bangalore', 'Whitefield is one of the most sought-after residential areas in Bangalore, known for its excellent connectivity to major IT companies and modern infrastructure. Home to tech giants like SAP, IBM, and Oracle.', 'Bangalore', 'Karnataka', '560066', true),
  ('Koramangala', 'koramangala', 'Startup Capital of India', 'Koramangala is a vibrant neighborhood known for its startup ecosystem, excellent dining options, and young professional community. Perfect blend of residential comfort and commercial convenience.', 'Bangalore', 'Karnataka', '560034', true),
  ('HSR Layout', 'hsr-layout', 'Premium Residential Hub', 'HSR Layout offers a perfect blend of modern amenities and peaceful living. Known for its well-planned infrastructure, parks, and proximity to major IT corridors.', 'Bangalore', 'Karnataka', '560102', true),
  ('Electronic City', 'electronic-city', 'Tech Corridor', 'Electronic City is a major IT hub with excellent infrastructure and connectivity. Home to major companies like Infosys, Wipro, and TCS. Ideal for IT professionals.', 'Bangalore', 'Karnataka', '560100', true),
  ('Indiranagar', 'indiranagar', 'Cultural Heart of Bangalore', 'Indiranagar is known for its cultural vibrancy, premium residential options, and bustling commercial street. Perfect for those who love city life.', 'Bangalore', 'Karnataka', '560038', true),
  ('Jayanagar', 'jayanagar', 'Traditional Bangalore Charm', 'Jayanagar retains the old-world charm of Bangalore with tree-lined streets, parks, and traditional South Indian culture. Great for families.', 'Bangalore', 'Karnataka', '560011', false),
  ('Marathahalli', 'marathahalli', 'IT Professional Hub', 'Marathahalli is a rapidly developing area with excellent connectivity to major IT parks. Popular among young professionals and families.', 'Bangalore', 'Karnataka', '560037', false),
  ('Bannerghatta Road', 'bannerghatta-road', 'Nature Meets City', 'Bannerghatta Road offers proximity to nature with the famous Bannerghatta National Park while maintaining excellent city connectivity.', 'Bangalore', 'Karnataka', '560076', false)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (name, location, rating, comment, property_type, is_featured) VALUES
  ('Rajesh Kumar', 'Whitefield', 5, 'Dream House Properties helped me find my perfect 3BHK apartment in Whitefield. The team was very professional and guided me through the entire process. Highly recommended!', '3BHK Apartment', true),
  ('Priya Sharma', 'HSR Layout', 5, 'Excellent service! Found a beautiful villa in HSR Layout within my budget. The property details were accurate and the documentation process was smooth.', 'Villa', true),
  ('Amit Patel', 'Koramangala', 4, 'Good experience with Dream House Properties. They have a great selection of properties and the staff is knowledgeable about the local market.', '2BHK Apartment', false),
  ('Sneha Reddy', 'Electronic City', 5, 'As a first-time home buyer, I was nervous about the process. But Dream House Properties made it so easy and transparent. Got my dream home!', '2BHK Apartment', true),
  ('Vikram Singh', 'Indiranagar', 5, 'Sold my property through Dream House Properties. They got me the best price and handled all the paperwork efficiently.', '3BHK Apartment', false)
ON CONFLICT DO NOTHING;

-- Insert sample blog posts
INSERT INTO blogs (title, slug, excerpt, content, author, category, tags, published, is_featured, published_at) VALUES
  ('Complete Guide to Buying Your First Home in Bangalore', 'first-home-buying-guide-bangalore', 'Everything you need to know about buying your first property in Bangalore, from budget planning to legal documentation.', 'Buying your first home is an exciting milestone, but it can also be overwhelming. This comprehensive guide will walk you through every step of the home buying process in Bangalore...', 'Dream House Properties', 'Buying Guide', ARRAY['first-time-buyer', 'bangalore', 'home-buying', 'guide'], true, true, NOW()),
  ('Top 10 Locations to Invest in Bangalore Real Estate 2024', 'top-locations-bangalore-investment-2024', 'Discover the most promising areas in Bangalore for real estate investment with high growth potential and excellent returns.', 'Bangalore continues to be one of India''s hottest real estate markets. Here are the top 10 locations that offer the best investment opportunities...', 'Dream House Properties', 'Investment Tips', ARRAY['investment', 'bangalore', 'locations', '2024'], true, true, NOW()),
  ('Understanding Property Documentation in Karnataka', 'property-documentation-karnataka', 'A detailed guide to all the essential documents you need when buying property in Karnataka state.', 'Property documentation is crucial for a safe real estate transaction. Here''s everything you need to know about the essential documents...', 'Dream House Properties', 'Buying Guide', ARRAY['documentation', 'karnataka', 'legal', 'property'], true, false, NOW())
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- 10. Create Views for Common Queries
-- =============================================

-- View for properties with location details
CREATE OR REPLACE VIEW properties_with_locations AS
SELECT 
  p.*,
  array_agg(l.name) as location_names,
  array_agg(l.slug) as location_slugs
FROM properties p
LEFT JOIN property_locations pl ON p.id = pl.property_id
LEFT JOIN locations l ON pl.location_id = l.id
GROUP BY p.id;

-- View for featured properties
CREATE OR REPLACE VIEW featured_properties AS
SELECT * FROM properties 
WHERE is_featured = true AND availability_status = 'available'
ORDER BY created_at DESC;

-- View for popular locations with property count
CREATE OR REPLACE VIEW popular_locations_with_count AS
SELECT 
  l.*,
  COUNT(pl.property_id) as property_count
FROM locations l
LEFT JOIN property_locations pl ON l.id = pl.location_id
LEFT JOIN properties p ON pl.property_id = p.id AND p.availability_status = 'available'
WHERE l.is_popular = true
GROUP BY l.id
ORDER BY property_count DESC;

-- =============================================
-- 11. Enable Realtime (Optional)
-- =============================================

-- Uncomment to enable realtime subscriptions
/*
ALTER PUBLICATION supabase_realtime ADD TABLE properties;
ALTER PUBLICATION supabase_realtime ADD TABLE contact_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE property_views;
*/ 