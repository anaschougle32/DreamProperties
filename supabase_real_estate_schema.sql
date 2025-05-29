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
  city VARCHAR(255) NOT NULL DEFAULT 'Mumbai',
  state VARCHAR(255) NOT NULL DEFAULT 'Maharashtra',
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

-- Admin access policies (service role) - Fixed syntax
CREATE POLICY "Enable all for service role on properties"
  ON properties FOR ALL TO service_role;

CREATE POLICY "Enable all for service role on locations"
  ON locations FOR ALL TO service_role;

CREATE POLICY "Enable all for service role on property_locations"
  ON property_locations FOR ALL TO service_role;

CREATE POLICY "Enable all for service role on testimonials"
  ON testimonials FOR ALL TO service_role;

CREATE POLICY "Enable all for service role on contact_messages"
  ON contact_messages FOR ALL TO service_role;

CREATE POLICY "Enable all for service role on blogs"
  ON blogs FOR ALL TO service_role;

CREATE POLICY "Enable all for service role on property_views"
  ON property_views FOR ALL TO service_role;

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
-- 9. Sample Data for Dream House Properties - Mumbai
-- =============================================

-- Insert Mumbai locations
INSERT INTO locations (name, slug, headline, content, city, state, pincode, is_popular) VALUES
  ('Bandra West', 'bandra-west', 'The Queen of Suburbs', 'Bandra West is one of Mumbai''s most prestigious neighborhoods, known for its upscale lifestyle, celebrity homes, and excellent connectivity. Home to Bollywood stars and business tycoons.', 'Mumbai', 'Maharashtra', '400050', true),
  ('Juhu', 'juhu', 'Beachside Luxury Living', 'Juhu offers a perfect blend of beachside living and urban convenience. Known for its beautiful beach, upscale restaurants, and proximity to the airport. Popular among celebrities and business families.', 'Mumbai', 'Maharashtra', '400049', true),
  ('Powai', 'powai', 'IT Hub of Mumbai', 'Powai is a planned township known for its IT companies, educational institutions, and modern infrastructure. Home to IIT Bombay and major corporate offices.', 'Mumbai', 'Maharashtra', '400076', true),
  ('Andheri West', 'andheri-west', 'Commercial & Residential Hub', 'Andheri West is a major commercial and residential area with excellent connectivity to airports and business districts. Known for its vibrant nightlife and shopping centers.', 'Mumbai', 'Maharashtra', '400053', true),
  ('Lower Parel', 'lower-parel', 'Business District', 'Lower Parel has transformed into Mumbai''s new business district with modern skyscrapers, corporate offices, and luxury residential complexes. Excellent connectivity via metro and local trains.', 'Mumbai', 'Maharashtra', '400013', true),
  ('Worli', 'worli', 'Upscale Waterfront Living', 'Worli offers premium waterfront living with stunning sea views. Known for luxury high-rises, the Bandra-Worli Sea Link, and proximity to business districts.', 'Mumbai', 'Maharashtra', '400018', true),
  ('Malad West', 'malad-west', 'Emerging Residential Hub', 'Malad West is an emerging residential area with good connectivity and affordable housing options. Popular among young professionals and families.', 'Mumbai', 'Maharashtra', '400064', false),
  ('Thane West', 'thane-west', 'Planned City Living', 'Thane West offers planned city living with good infrastructure, parks, and connectivity to Mumbai. Known for its lakes, hills, and family-friendly environment.', 'Mumbai', 'Maharashtra', '400601', false)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample properties
INSERT INTO properties (title, slug, price, listing_type, property_type, bedrooms, bathrooms, area_sqft, furnishing, year_built, facing, floor_number, total_floors, description, features, amenities, is_featured, is_premium) VALUES
  ('Luxury 3BHK Sea View Apartment in Bandra West', 'luxury-3bhk-bandra-west', 45000000, 'sale', 'Apartment', 3, 3, 1800, 'Semi-Furnished', 2020, 'West', 15, 25, 'Stunning sea-facing 3BHK apartment in prime Bandra West location with modern amenities and breathtaking Arabian Sea views.', ARRAY['Parking', 'Gym', 'Swimming Pool', 'Security', 'Power Backup', 'Lift'], ARRAY['Club House', 'Garden', 'Children Play Area', 'Jogging Track', 'Spa'], true, true),
  ('Premium 2BHK in Juhu with Beach Access', 'premium-2bhk-juhu-beach', 35000000, 'sale', 'Apartment', 2, 2, 1200, 'Furnished', 2019, 'North', 8, 20, 'Beautiful 2BHK apartment just 2 minutes walk from Juhu Beach. Perfect for those who love beachside living.', ARRAY['Parking', 'Security', 'Power Backup', 'Lift', 'Intercom'], ARRAY['Beach Access', 'Garden', 'Swimming Pool'], true, false),
  ('Modern 4BHK Villa in Powai', 'modern-4bhk-villa-powai', 55000000, 'sale', 'Villa', 4, 4, 2500, 'Unfurnished', 2021, 'East', 0, 3, 'Spacious 4BHK villa in gated community with lake views and modern amenities. Perfect for large families.', ARRAY['Parking', 'Garden', 'Security', 'Power Backup'], ARRAY['Club House', 'Swimming Pool', 'Tennis Court', 'Gym'], true, true),
  ('Cozy 1BHK for Rent in Andheri West', 'cozy-1bhk-andheri-west-rent', 45000, 'rent', 'Apartment', 1, 1, 650, 'Furnished', 2018, 'South', 5, 12, 'Well-furnished 1BHK apartment perfect for working professionals. Close to metro station and IT parks.', ARRAY['Parking', 'Security', 'Lift'], ARRAY['Gym', 'Garden'], false, false),
  ('Luxury Penthouse in Lower Parel', 'luxury-penthouse-lower-parel', 85000000, 'sale', 'Penthouse', 4, 5, 3200, 'Furnished', 2022, 'North', 30, 30, 'Ultra-luxury penthouse with panoramic city views, private terrace, and premium amenities in Mumbai''s business district.', ARRAY['Private Terrace', 'Parking', 'Gym', 'Swimming Pool', 'Security', 'Power Backup', 'Lift'], ARRAY['Concierge', 'Spa', 'Business Center', 'Helipad'], true, true),
  ('Spacious 3BHK in Worli with Sea View', 'spacious-3bhk-worli-sea-view', 65000000, 'sale', 'Apartment', 3, 3, 2000, 'Semi-Furnished', 2020, 'West', 20, 35, 'Premium 3BHK apartment with stunning sea views and world-class amenities in upscale Worli.', ARRAY['Parking', 'Gym', 'Swimming Pool', 'Security', 'Power Backup', 'Lift'], ARRAY['Club House', 'Spa', 'Business Center', 'Jogging Track'], true, true),
  ('Affordable 2BHK in Malad West', 'affordable-2bhk-malad-west', 18000000, 'sale', 'Apartment', 2, 2, 950, 'Unfurnished', 2019, 'East', 7, 15, 'Well-designed 2BHK apartment in emerging Malad West location with good connectivity and amenities.', ARRAY['Parking', 'Security', 'Lift', 'Power Backup'], ARRAY['Garden', 'Children Play Area'], false, false),
  ('Family Villa in Thane West', 'family-villa-thane-west', 28000000, 'sale', 'Villa', 3, 3, 1800, 'Unfurnished', 2020, 'North', 0, 2, 'Beautiful family villa in peaceful Thane West with garden and modern amenities. Perfect for families seeking tranquil living.', ARRAY['Garden', 'Parking', 'Security', 'Power Backup'], ARRAY['Club House', 'Swimming Pool', 'Children Play Area'], false, false)
ON CONFLICT (slug) DO NOTHING;

-- Link properties to locations
INSERT INTO property_locations (property_id, location_id)
SELECT p.id, l.id 
FROM properties p, locations l 
WHERE (p.slug = 'luxury-3bhk-bandra-west' AND l.slug = 'bandra-west')
   OR (p.slug = 'premium-2bhk-juhu-beach' AND l.slug = 'juhu')
   OR (p.slug = 'modern-4bhk-villa-powai' AND l.slug = 'powai')
   OR (p.slug = 'cozy-1bhk-andheri-west-rent' AND l.slug = 'andheri-west')
   OR (p.slug = 'luxury-penthouse-lower-parel' AND l.slug = 'lower-parel')
   OR (p.slug = 'spacious-3bhk-worli-sea-view' AND l.slug = 'worli')
   OR (p.slug = 'affordable-2bhk-malad-west' AND l.slug = 'malad-west')
   OR (p.slug = 'family-villa-thane-west' AND l.slug = 'thane-west')
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (name, location, rating, comment, property_type, is_featured) VALUES
  ('Rajesh Sharma', 'Bandra West', 5, 'Dream House Properties helped me find my perfect sea-view apartment in Bandra West. The team was very professional and guided me through the entire process. Highly recommended!', '3BHK Apartment', true),
  ('Priya Patel', 'Juhu', 5, 'Excellent service! Found a beautiful apartment near Juhu Beach within my budget. The property details were accurate and the documentation process was smooth.', '2BHK Apartment', true),
  ('Amit Kumar', 'Powai', 4, 'Good experience with Dream House Properties. They have a great selection of properties and the staff is knowledgeable about the Mumbai market.', 'Villa', false),
  ('Sneha Reddy', 'Andheri West', 5, 'As a first-time home buyer, I was nervous about the process. But Dream House Properties made it so easy and transparent. Got my dream home!', '1BHK Apartment', true),
  ('Vikram Singh', 'Lower Parel', 5, 'Sold my property through Dream House Properties. They got me the best price and handled all the paperwork efficiently.', 'Penthouse', false)
ON CONFLICT DO NOTHING;

-- Insert sample blog posts
INSERT INTO blogs (title, slug, excerpt, content, author, category, tags, published, is_featured, published_at) VALUES
  ('Complete Guide to Buying Your First Home in Mumbai', 'first-home-buying-guide-mumbai', 'Everything you need to know about buying your first property in Mumbai, from budget planning to legal documentation.', 'Buying your first home in Mumbai is an exciting milestone, but it can also be overwhelming. This comprehensive guide will walk you through every step of the home buying process in Mumbai...', 'Dream House Properties', 'Buying Guide', ARRAY['first-time-buyer', 'mumbai', 'home-buying', 'guide'], true, true, NOW()),
  ('Top 10 Locations to Invest in Mumbai Real Estate 2024', 'top-locations-mumbai-investment-2024', 'Discover the most promising areas in Mumbai for real estate investment with high growth potential and excellent returns.', 'Mumbai continues to be one of India''s hottest real estate markets. Here are the top 10 locations that offer the best investment opportunities...', 'Dream House Properties', 'Investment Tips', ARRAY['investment', 'mumbai', 'locations', '2024'], true, true, NOW()),
  ('Understanding Property Documentation in Maharashtra', 'property-documentation-maharashtra', 'A detailed guide to all the essential documents you need when buying property in Maharashtra state.', 'Property documentation is crucial for a safe real estate transaction. Here''s everything you need to know about the essential documents...', 'Dream House Properties', 'Buying Guide', ARRAY['documentation', 'maharashtra', 'legal', 'property'], true, false, NOW())
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