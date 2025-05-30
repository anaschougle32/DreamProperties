-- Mumbai Real Estate Database Setup Script
-- This script sets up the complete database schema and populates it with Mumbai real estate data

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS property_views CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS locations CASCADE;

-- Create locations table for Mumbai areas
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    headline TEXT,
    content TEXT,
    city VARCHAR(50) DEFAULT 'Mumbai',
    state VARCHAR(50) DEFAULT 'Maharashtra',
    pincode VARCHAR(10),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_popular BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create properties table
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    price BIGINT NOT NULL,
    listing_type VARCHAR(20) NOT NULL CHECK (listing_type IN ('sale', 'rent')),
    property_type VARCHAR(50) NOT NULL CHECK (property_type IN ('apartment', 'villa', 'independent-house', 'penthouse', 'studio')),
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    area_sqft INTEGER,
    furnishing VARCHAR(20) CHECK (furnishing IN ('unfurnished', 'semi-furnished', 'fully-furnished')),
    availability_status VARCHAR(20) DEFAULT 'available' CHECK (availability_status IN ('available', 'sold', 'rented', 'under-offer')),
    year_built INTEGER,
    facing VARCHAR(20),
    floor_number INTEGER,
    total_floors INTEGER,
    description TEXT,
    features TEXT[], -- Array of features
    amenities TEXT[], -- Array of amenities
    main_image TEXT,
    images TEXT[], -- Array of image URLs
    video_tour TEXT,
    virtual_tour TEXT,
    location_id UUID REFERENCES locations(id),
    location VARCHAR(100), -- For backward compatibility
    is_featured BOOLEAN DEFAULT false,
    is_premium BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blogs table
CREATE TABLE blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image TEXT,
    category VARCHAR(50) DEFAULT 'Real Estate',
    tags TEXT[],
    is_published BOOLEAN DEFAULT true,
    meta_title VARCHAR(200),
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    designation VARCHAR(100),
    company VARCHAR(100),
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    image TEXT,
    location VARCHAR(100),
    property_type VARCHAR(50),
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact messages table
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    property_interest VARCHAR(100),
    location_interest VARCHAR(100),
    budget_range VARCHAR(50),
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create property views table for analytics
CREATE TABLE property_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Mumbai locations
INSERT INTO locations (name, slug, headline, content, city, state, pincode, latitude, longitude, is_popular) VALUES
-- Prime Western Suburbs
('Bandra West', 'bandra-west', 'Luxury Properties in Bandra West - The Queen of Suburbs', 'Discover premium apartments and penthouses in Bandra West with stunning sea views, excellent connectivity, and world-class amenities. Known as the "Queen of Suburbs," Bandra West is Mumbai''s most prestigious neighborhood, home to Bollywood celebrities and business tycoons. The area offers excellent connectivity via Western Railway, metro, and the iconic Bandra-Worli Sea Link. Key attractions include Bandstand Promenade, Carter Road, and numerous fine dining restaurants and cafes. Property prices range from ₹3 Cr to ₹15 Cr for luxury apartments.', 'Mumbai', 'Maharashtra', '400050', 19.0596, 72.8295, true),

('Juhu', 'juhu', 'Beachside Luxury Properties in Juhu, Mumbai', 'Experience coastal living with luxury villas and apartments in Juhu, Mumbai''s entertainment hub. Juhu is famous for its beautiful beach, proximity to the airport, and celebrity homes. The area offers excellent connectivity to the airport (10 minutes), business districts, and entertainment venues. Key attractions include Juhu Beach, ISKCON Temple, and numerous five-star hotels and restaurants. Property prices range from ₹4 Cr to ₹20 Cr for beachside properties.', 'Mumbai', 'Maharashtra', '400049', 19.1075, 72.8263, true),

('Andheri West', 'andheri-west', 'Premium Properties in Andheri West with Excellent Connectivity', 'Explore luxury apartments in Andheri West with metro connectivity, proximity to airport, and vibrant commercial areas. Andheri West is one of Mumbai''s most well-connected suburbs, offering the perfect blend of residential comfort and commercial convenience. The area offers excellent connectivity via Western Railway, metro, and proximity to the international airport. Key attractions include Versova Beach, Lokhandwala Market, and numerous entertainment venues. Property prices range from ₹1.5 Cr to ₹6 Cr.', 'Mumbai', 'Maharashtra', '400053', 19.1136, 72.8697, true),

('Powai', 'powai', 'Modern Properties in Powai - Mumbai''s IT Hub', 'Find contemporary apartments and villas in Powai with stunning lake views, modern infrastructure, and proximity to IT companies. Powai is Mumbai''s planned suburb, known for its IT companies, educational institutions, and beautiful lake. The area offers excellent connectivity via Eastern Express Highway and upcoming metro lines. Key attractions include Powai Lake, Hiranandani Gardens, and numerous shopping malls and restaurants. Property prices range from ₹1.5 Cr to ₹8 Cr.', 'Mumbai', 'Maharashtra', '400076', 19.1197, 72.9056, true),

-- Central Mumbai Premium Areas
('Lower Parel', 'lower-parel', 'High-Rise Luxury Properties in Lower Parel Business District', 'Discover premium high-rise apartments in Lower Parel, Mumbai''s business district with corporate offices, shopping malls, and fine dining. Lower Parel has transformed from a mill district to Mumbai''s new business hub, housing major corporate offices and luxury residential towers. The area offers excellent connectivity via Western Railway and upcoming metro lines. Key attractions include Phoenix Mills, Palladium Mall, and numerous corporate offices. Property prices range from ₹4 Cr to ₹20 Cr.', 'Mumbai', 'Maharashtra', '400013', 19.0176, 72.8310, true),

('Worli', 'worli', 'Ultra-Luxury Properties in Worli with Sea Views', 'Experience the pinnacle of luxury living in Worli with sea-facing penthouses, premium towers, and proximity to Bandra-Worli Sea Link. Worli is one of Mumbai''s most prestigious addresses, known for its ultra-luxury residential towers and stunning sea views. The area offers excellent connectivity via Bandra-Worli Sea Link and upcoming metro lines. Key attractions include Worli Sea Face, Nehru Planetarium, and numerous five-star hotels. Property prices range from ₹5 Cr to ₹50 Cr.', 'Mumbai', 'Maharashtra', '400018', 19.0176, 72.8156, true),

-- South Mumbai Heritage Areas
('Colaba', 'colaba', 'Heritage Properties in Colaba - South Mumbai''s Crown Jewel', 'Explore heritage apartments and modern penthouses in Colaba with proximity to Gateway of India, Taj Hotel, and Mumbai''s business district. Colaba is South Mumbai''s most iconic neighborhood, known for its colonial architecture, heritage buildings, and proximity to the business district. Key landmarks include Gateway of India, Taj Mahal Palace Hotel, and Colaba Causeway. Property prices range from ₹6 Cr to ₹30 Cr.', 'Mumbai', 'Maharashtra', '400001', 18.9067, 72.8147, true),

('Marine Drive', 'marine-drive', 'Iconic Properties on Marine Drive - Queen''s Necklace', 'Own a piece of Mumbai''s heritage with apartments on Marine Drive offering stunning sea views and proximity to Nariman Point business district. Marine Drive is Mumbai''s most iconic promenade, known as the Queen''s Necklace for its curved shape and street lights. The area offers unparalleled sea views and proximity to the business district. Property prices range from ₹8 Cr to ₹40 Cr.', 'Mumbai', 'Maharashtra', '400020', 18.9441, 72.8238, true),

('Malabar Hill', 'malabar-hill', 'Elite Properties in Malabar Hill - Mumbai''s Most Prestigious Address', 'Discover ultra-luxury apartments and bungalows in Malabar Hill, home to Mumbai''s elite with panoramic city and sea views. Malabar Hill is Mumbai''s most exclusive residential area, home to politicians, business tycoons, and celebrities. The area offers panoramic views of the city and Arabian Sea. Property prices range from ₹10 Cr to ₹100 Cr.', 'Mumbai', 'Maharashtra', '400006', 18.9558, 72.8056, true),

-- Extended Western Suburbs
('Khar West', 'khar-west', 'Boutique Properties in Khar West - Mumbai''s Cultural Hub', 'Find charming apartments and independent houses in Khar West with tree-lined streets, cafes, and proximity to Bandra and Juhu. Khar West is known for its bohemian culture, tree-lined streets, and proximity to beaches. The area offers a perfect blend of urban convenience and suburban charm. Property prices range from ₹2.5 Cr to ₹8 Cr.', 'Mumbai', 'Maharashtra', '400052', 19.0728, 72.8347, false),

('Santacruz West', 'santacruz-west', 'Family-Friendly Properties in Santacruz West', 'Discover comfortable apartments and villas in Santacruz West with good schools, parks, and excellent connectivity to airport and business districts. Santacruz West is a well-established residential area known for its family-friendly environment and excellent connectivity. Property prices range from ₹2 Cr to ₹7 Cr.', 'Mumbai', 'Maharashtra', '400054', 19.0896, 72.8656, false),

('Goregaon West', 'goregaon-west', 'Affordable Luxury Properties in Goregaon West', 'Find value-for-money apartments and villas in Goregaon West with metro connectivity, Film City proximity, and modern amenities. Goregaon West offers excellent value for money with good connectivity and modern infrastructure. The area is close to Film City and offers metro connectivity. Property prices range from ₹1.2 Cr to ₹5 Cr.', 'Mumbai', 'Maharashtra', '400062', 19.1663, 72.8526, false),

('Malad West', 'malad-west', 'Growing Properties Market in Malad West', 'Explore emerging residential projects in Malad West with good connectivity, shopping centers, and proximity to business hubs. Malad West is an emerging residential area with good connectivity and modern amenities. The area offers excellent value for money and growth potential. Property prices range from ₹1 Cr to ₹4 Cr.', 'Mumbai', 'Maharashtra', '400064', 19.1864, 72.8493, false),

('Borivali West', 'borivali-west', 'Family Properties in Borivali West with Green Spaces', 'Discover family-friendly apartments in Borivali West near Sanjay Gandhi National Park with excellent schools and healthcare facilities. Borivali West is known for its proximity to Sanjay Gandhi National Park and family-friendly environment. The area offers good schools, hospitals, and recreational facilities. Property prices range from ₹80 L to ₹3 Cr.', 'Mumbai', 'Maharashtra', '400092', 19.2307, 72.8567, false),

-- Navi Mumbai
('Vashi', 'vashi', 'Modern Properties in Vashi - Navi Mumbai''s Commercial Hub', 'Find contemporary apartments and commercial spaces in Vashi with planned infrastructure and excellent connectivity to Mumbai. Vashi is Navi Mumbai''s commercial hub with planned infrastructure and excellent connectivity. The area offers modern amenities and good investment potential. Property prices range from ₹80 L to ₹3 Cr.', 'Mumbai', 'Maharashtra', '400703', 19.0728, 72.9956, false),

('Kharghar', 'kharghar', 'Spacious Properties in Kharghar with Modern Amenities', 'Explore spacious apartments and villas in Kharghar with planned development, golf course, and proximity to upcoming airport. Kharghar offers spacious properties with modern amenities and planned infrastructure. The area has a golf course and is close to the upcoming Navi Mumbai airport. Property prices range from ₹60 L to ₹2.5 Cr.', 'Mumbai', 'Maharashtra', '410210', 19.0330, 73.0297, false);

-- Insert sample properties
INSERT INTO properties (title, slug, price, listing_type, property_type, bedrooms, bathrooms, area_sqft, furnishing, availability_status, description, features, amenities, main_image, images, location_id, location, is_featured, is_premium) VALUES

-- Bandra West Properties
('Luxury 3BHK Sea View Apartment in Bandra West', 'luxury-3bhk-sea-view-bandra-west', 45000000, 'sale', 'apartment', 3, 3, 1800, 'semi-furnished', 'available', 'Stunning 3BHK apartment with panoramic sea views in the heart of Bandra West. This premium property features modern amenities, spacious rooms, and is located in a prestigious building with 24/7 security.', ARRAY['Sea View', 'Swimming Pool', 'Gym', 'Security', 'Parking', 'Power Backup'], ARRAY['Swimming Pool', 'Gymnasium', 'Security', 'Parking', 'Power Backup', 'Lift', 'Garden'], '/images/properties/bandra-west-1.jpg', ARRAY['/images/properties/bandra-west-1.jpg', '/images/properties/bandra-west-1-2.jpg'], (SELECT id FROM locations WHERE slug = 'bandra-west'), 'Bandra West', true, true),

('Premium 2BHK Apartment near Carter Road', 'premium-2bhk-carter-road-bandra', 35000000, 'sale', 'apartment', 2, 2, 1200, 'fully-furnished', 'available', 'Beautiful 2BHK apartment near the famous Carter Road promenade. Perfect for young professionals and couples looking for a modern lifestyle in Mumbai''s most happening neighborhood.', ARRAY['Modern Kitchen', 'Balcony', 'Security', 'Parking'], ARRAY['Security', 'Parking', 'Lift', 'Power Backup'], '/images/properties/bandra-west-2.jpg', ARRAY['/images/properties/bandra-west-2.jpg'], (SELECT id FROM locations WHERE slug = 'bandra-west'), 'Bandra West', false, false),

-- Juhu Properties
('Beachside 4BHK Villa in Juhu', 'beachside-4bhk-villa-juhu', 85000000, 'sale', 'villa', 4, 4, 3500, 'fully-furnished', 'available', 'Magnificent 4BHK villa just 2 minutes walk from Juhu Beach. This property offers luxury living with private garden, swimming pool, and stunning beach views.', ARRAY['Beach View', 'Private Garden', 'Swimming Pool', 'Parking', 'Security'], ARRAY['Swimming Pool', 'Garden', 'Security', 'Parking', 'Power Backup'], '/images/properties/juhu-1.jpg', ARRAY['/images/properties/juhu-1.jpg'], (SELECT id FROM locations WHERE slug = 'juhu'), 'Juhu', true, true),

('Modern 3BHK Apartment near Airport', 'modern-3bhk-juhu-airport', 55000000, 'sale', 'apartment', 3, 3, 2000, 'semi-furnished', 'available', 'Contemporary 3BHK apartment in Juhu with easy airport access. Perfect for frequent travelers and those who appreciate modern amenities and convenience.', ARRAY['Airport Proximity', 'Modern Amenities', 'Parking', 'Security'], ARRAY['Gymnasium', 'Security', 'Parking', 'Lift', 'Power Backup'], '/images/properties/juhu-2.jpg', ARRAY['/images/properties/juhu-2.jpg'], (SELECT id FROM locations WHERE slug = 'juhu'), 'Juhu', false, false),

-- Powai Properties
('Lake View 3BHK in Hiranandani Gardens', 'lake-view-3bhk-hiranandani-powai', 42000000, 'sale', 'apartment', 3, 3, 1650, 'semi-furnished', 'available', 'Serene 3BHK apartment overlooking Powai Lake in the prestigious Hiranandani Gardens. Enjoy modern living with excellent connectivity to IT hubs and educational institutions.', ARRAY['Lake View', 'Gated Community', 'Club House', 'Swimming Pool', 'Parking'], ARRAY['Swimming Pool', 'Gymnasium', 'Club House', 'Security', 'Parking', 'Garden'], '/images/properties/powai-1.jpg', ARRAY['/images/properties/powai-1.jpg'], (SELECT id FROM locations WHERE slug = 'powai'), 'Powai', true, false),

('IT Professional 2BHK near Tech Parks', 'it-professional-2bhk-powai', 28000000, 'sale', 'apartment', 2, 2, 1100, 'fully-furnished', 'available', 'Perfect 2BHK apartment for IT professionals with easy access to major tech parks. Modern amenities and excellent connectivity make this an ideal investment.', ARRAY['Tech Park Proximity', 'Modern Kitchen', 'Parking', 'Security'], ARRAY['Security', 'Parking', 'Lift', 'Power Backup'], '/images/properties/powai-2.jpg', ARRAY['/images/properties/powai-2.jpg'], (SELECT id FROM locations WHERE slug = 'powai'), 'Powai', false, false),

-- Lower Parel Properties
('Corporate Executive 4BHK in Lower Parel', 'corporate-executive-4bhk-lower-parel', 75000000, 'sale', 'apartment', 4, 4, 2800, 'fully-furnished', 'available', 'Luxurious 4BHK apartment in Mumbai''s business district. Perfect for corporate executives with premium amenities and proximity to major offices and shopping destinations.', ARRAY['Business District', 'Premium Amenities', 'City View', 'Parking'], ARRAY['Swimming Pool', 'Gymnasium', 'Security', 'Parking', 'Concierge', 'Spa'], '/images/properties/lower-parel-1.jpg', ARRAY['/images/properties/lower-parel-1.jpg'], (SELECT id FROM locations WHERE slug = 'lower-parel'), 'Lower Parel', true, true),

-- Worli Properties
('Ultra-Luxury Penthouse with Sea View', 'ultra-luxury-penthouse-worli', 120000000, 'sale', 'penthouse', 4, 5, 4000, 'fully-furnished', 'available', 'Spectacular penthouse with 360-degree views of Mumbai skyline and Arabian Sea. This ultra-luxury property features private terrace, jacuzzi, and world-class amenities.', ARRAY['360 Degree View', 'Private Terrace', 'Jacuzzi', 'Premium Location'], ARRAY['Swimming Pool', 'Gymnasium', 'Spa', 'Concierge', 'Security', 'Parking', 'Private Lift'], '/images/properties/worli-1.jpg', ARRAY['/images/properties/worli-1.jpg'], (SELECT id FROM locations WHERE slug = 'worli'), 'Worli', true, true),

-- Andheri West Properties
('Family 3BHK near Metro Station', 'family-3bhk-metro-andheri-west', 38000000, 'sale', 'apartment', 3, 3, 1500, 'semi-furnished', 'available', 'Comfortable 3BHK apartment with excellent metro connectivity. Perfect for families looking for convenience and modern amenities in a well-connected location.', ARRAY['Metro Connectivity', 'Family Friendly', 'Shopping Centers', 'Parking'], ARRAY['Security', 'Parking', 'Lift', 'Power Backup', 'Garden'], '/images/properties/andheri-west-1.jpg', ARRAY['/images/properties/andheri-west-1.jpg'], (SELECT id FROM locations WHERE slug = 'andheri-west'), 'Andheri West', false, false),

-- Colaba Properties
('Heritage 2BHK near Gateway of India', 'heritage-2bhk-gateway-colaba', 65000000, 'sale', 'apartment', 2, 2, 1400, 'fully-furnished', 'available', 'Charming heritage apartment in the heart of South Mumbai. Walking distance to Gateway of India, Taj Hotel, and major business districts.', ARRAY['Heritage Building', 'Prime Location', 'Walking Distance to Landmarks'], ARRAY['Security', 'Lift', 'Power Backup'], '/images/properties/colaba-1.jpg', ARRAY['/images/properties/colaba-1.jpg'], (SELECT id FROM locations WHERE slug = 'colaba'), 'Colaba', true, true);

-- Insert blog posts
INSERT INTO blogs (title, slug, excerpt, content, cover_image, category, tags, is_published, meta_title, meta_description) VALUES

('Mumbai Real Estate Market Trends 2024', 'mumbai-real-estate-trends-2024', 'Comprehensive analysis of Mumbai real estate market trends, price movements, and investment opportunities in 2024.', 'The Mumbai real estate market in 2024 shows promising growth with several key trends emerging. Bandra West continues to lead in luxury segment with average prices touching ₹4 Cr for 3BHK apartments. Powai and Andheri West show strong growth in mid-segment housing...', '/images/blog/mumbai-trends-2024.jpg', 'Market Analysis', ARRAY['Mumbai', 'Real Estate', 'Market Trends', '2024'], true, 'Mumbai Real Estate Market Trends 2024 - Complete Analysis', 'Discover the latest Mumbai real estate market trends for 2024. Get insights on price movements, investment opportunities, and growth areas in Mumbai property market.'),

('Best Areas to Buy Property in Mumbai 2024', 'best-areas-buy-property-mumbai-2024', 'Discover the top Mumbai neighborhoods for property investment with detailed analysis of growth potential and amenities.', 'Choosing the right location is crucial for property investment in Mumbai. Based on our analysis, Bandra West, Powai, and Lower Parel emerge as top choices for different budget segments. Bandra West offers luxury living with excellent connectivity...', '/images/blog/best-areas-mumbai.jpg', 'Buying Guide', ARRAY['Mumbai', 'Property Investment', 'Location Guide'], true, 'Best Areas to Buy Property in Mumbai 2024 - Investment Guide', 'Find the best areas to buy property in Mumbai 2024. Complete guide to top neighborhoods, investment potential, and amenities for property buyers.'),

('RERA Compliance Guide for Mumbai Properties', 'rera-compliance-guide-mumbai', 'Complete guide to RERA compliance for Mumbai property buyers including verification process and important documents.', 'RERA (Real Estate Regulatory Authority) compliance is mandatory for all property transactions in Mumbai. This comprehensive guide covers everything you need to know about RERA verification, important documents, and how to ensure your property purchase is legally compliant...', '/images/blog/rera-guide.jpg', 'Legal Guide', ARRAY['RERA', 'Legal Compliance', 'Mumbai Properties'], true, 'RERA Compliance Guide for Mumbai Properties - Legal Requirements', 'Complete RERA compliance guide for Mumbai property buyers. Learn about verification process, documents required, and legal requirements.'),

('Home Loan Guide for Mumbai Properties', 'home-loan-guide-mumbai-properties', 'Comprehensive guide to securing home loans for Mumbai properties including best banks, interest rates, and documentation.', 'Securing a home loan for Mumbai properties requires careful planning and documentation. With property prices ranging from ₹1 Cr to ₹50 Cr across different areas, choosing the right loan product is crucial. This guide covers the best banks offering home loans...', '/images/blog/home-loan-guide.jpg', 'Finance Guide', ARRAY['Home Loan', 'Mumbai Properties', 'Finance'], true, 'Home Loan Guide for Mumbai Properties - Best Banks & Rates', 'Complete home loan guide for Mumbai properties. Compare best banks, interest rates, eligibility criteria, and documentation requirements.'),

('Luxury Amenities in Mumbai High-Rise Buildings', 'luxury-amenities-mumbai-high-rise', 'Explore the world-class amenities offered in Mumbai''s luxury high-rise buildings and their impact on property values.', 'Mumbai''s luxury real estate market has evolved significantly with developers offering world-class amenities. From infinity pools and sky lounges to private theaters and spa facilities, modern high-rise buildings in areas like Worli, Lower Parel, and Bandra West...', '/images/blog/luxury-amenities.jpg', 'Luxury Living', ARRAY['Luxury Properties', 'Amenities', 'High-Rise'], true, 'Luxury Amenities in Mumbai High-Rise Buildings - Premium Living', 'Discover luxury amenities in Mumbai high-rise buildings. Explore world-class facilities and their impact on property values and lifestyle.');

-- Insert testimonials
INSERT INTO testimonials (name, designation, company, content, rating, image, location, property_type, is_featured) VALUES

('Rajesh Sharma', 'Senior Manager', 'Tata Consultancy Services', 'Dream House Properties helped me find the perfect 3BHK apartment in Powai. Their knowledge of the local market and professional approach made the entire process smooth and hassle-free. Highly recommended!', 5, '/images/testimonials/rajesh-sharma.jpg', 'Powai', 'Apartment', true),

('Priya Mehta', 'Marketing Director', 'Reliance Industries', 'Excellent service from Dream House Properties! They found me a beautiful sea-view apartment in Bandra West within my budget. The team was very responsive and guided me through every step of the purchase process.', 5, '/images/testimonials/priya-mehta.jpg', 'Bandra West', 'Apartment', true),

('Amit Patel', 'Entrepreneur', 'Tech Startup', 'I was looking for a luxury villa in Juhu and Dream House Properties delivered exactly what I wanted. Their expertise in Mumbai real estate is unmatched. The property they showed me was perfect for my family.', 5, '/images/testimonials/amit-patel.jpg', 'Juhu', 'Villa', false),

('Sneha Reddy', 'Investment Banker', 'Goldman Sachs', 'Professional and trustworthy team at Dream House Properties. They helped me invest in a premium property in Lower Parel. The ROI has been excellent and I''m planning to buy another property through them.', 5, '/images/testimonials/sneha-reddy.jpg', 'Lower Parel', 'Apartment', true),

('Vikram Singh', 'IT Director', 'Microsoft', 'Outstanding service! Dream House Properties understood my requirements perfectly and found me a modern apartment in Andheri West with excellent connectivity. The entire documentation process was handled professionally.', 5, '/images/testimonials/vikram-singh.jpg', 'Andheri West', 'Apartment', false),

('Kavya Iyer', 'Doctor', 'Lilavati Hospital', 'I highly recommend Dream House Properties for anyone looking to buy property in Mumbai. They helped me find a beautiful 2BHK apartment in Khar West. Their market knowledge and customer service are exceptional.', 5, '/images/testimonials/kavya-iyer.jpg', 'Khar West', 'Apartment', false);

-- Create indexes for better performance
CREATE INDEX idx_properties_location ON properties(location);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_property_type ON properties(property_type);
CREATE INDEX idx_properties_listing_type ON properties(listing_type);
CREATE INDEX idx_properties_bedrooms ON properties(bedrooms);
CREATE INDEX idx_properties_is_featured ON properties(is_featured);
CREATE INDEX idx_properties_availability_status ON properties(availability_status);
CREATE INDEX idx_locations_slug ON locations(slug);
CREATE INDEX idx_locations_is_popular ON locations(is_popular);
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_is_published ON blogs(is_published);
CREATE INDEX idx_blogs_category ON blogs(category);

-- Enable Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_views ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Public read access for locations" ON locations FOR SELECT USING (true);
CREATE POLICY "Public read access for published blogs" ON blogs FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access for testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public insert access for contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for property views" ON property_views FOR INSERT WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON properties, locations, blogs, testimonials TO anon, authenticated;
GRANT INSERT ON contact_messages, property_views TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Success message
SELECT 'Mumbai Real Estate Database Setup Complete!' as status; 