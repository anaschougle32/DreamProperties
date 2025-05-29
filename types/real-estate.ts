// Single vendor real estate types for Dream House Properties

export interface Property {
  id: string;
  title: string;
  slug: string;
  price: number;
  listing_type: 'sale' | 'rent';
  property_type: string; // 'Apartment', 'Villa', 'Independent House', 'Duplex'
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  furnishing: string | null; // 'Furnished', 'Semi-Furnished', 'Unfurnished'
  availability_status: string; // 'available', 'sold', 'rented', 'under_negotiation'
  year_built: number | null;
  facing: string | null; // 'North', 'South', 'East', 'West', 'North-East', etc.
  floor_number: number | null;
  total_floors: number | null;
  description: string | null;
  features: string[]; // ['Parking', 'Gym', 'Swimming Pool', 'Security', 'Power Backup']
  amenities: string[]; // ['Club House', 'Garden', 'Children Play Area', 'Jogging Track']
  main_image: string | null;
  images: string[];
  video_tour: string | null; // YouTube or video URL
  virtual_tour: string | null; // 360° tour URL
  is_featured: boolean;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
  locations?: Location[];
  view_count?: number;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  headline: string;
  content: string;
  city: string;
  state: string;
  pincode: string | null;
  latitude: number | null;
  longitude: number | null;
  image: string | null;
  is_popular: boolean;
  created_at: string;
  updated_at: string;
  property_count?: number;
}

export interface PropertyLocation {
  id: string;
  property_id: string;
  location_id: string;
  created_at: string;
  property?: Property;
  location?: Location;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number; // 1-5
  comment: string;
  image: string | null;
  property_type: string | null; // What type of property they bought/rented
  is_featured: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  property_id: string | null;
  inquiry_type: string; // 'general', 'property_inquiry', 'viewing_request', 'callback_request'
  status: string; // 'new', 'contacted', 'closed'
  created_at: string;
  property?: Property;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author: string; // Default: 'Dream House Properties'
  category: string | null; // 'Buying Guide', 'Market News', 'Investment Tips', 'Location Spotlight'
  tags: string[];
  published: boolean;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // SEO fields
  meta_title?: string;
  meta_description?: string;
  // Social sharing
  social_image?: string | null;
  // Additional fields
  views?: number;
  reading_time?: number;
}

export interface PropertyView {
  id: string;
  property_id: string;
  ip_address: string | null;
  user_agent: string | null;
  viewed_at: string;
}

// Search and Filter Types
export interface PropertyFilters {
  location?: string;
  property_type?: string;
  listing_type?: 'sale' | 'rent';
  min_price?: number;
  max_price?: number;
  min_bedrooms?: number;
  max_bedrooms?: number;
  min_bathrooms?: number;
  max_bathrooms?: number;
  min_area?: number;
  max_area?: number;
  furnishing?: string;
  is_featured?: boolean;
  is_premium?: boolean;
  availability_status?: string;
}

export interface PropertySearchParams {
  q?: string; // search query
  location?: string;
  property_type?: string;
  listing_type?: 'sale' | 'rent';
  min_price?: string;
  max_price?: string;
  bedrooms?: string;
  bathrooms?: string;
  furnishing?: string;
  page?: string;
  limit?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'oldest' | 'area_asc' | 'area_desc' | 'popular';
}

// API Response Types
export interface PropertyResponse {
  data: Property[];
  count: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface LocationWithProperties extends Location {
  properties: Property[];
  property_count: number;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  property_id?: string;
  inquiry_type?: 'general' | 'property_inquiry' | 'viewing_request' | 'callback_request';
}

export interface PropertyInquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  property_id: string;
  inquiry_type: 'viewing' | 'info' | 'purchase' | 'rent';
}

export interface PropertySearchFormData {
  query?: string;
  location?: string;
  property_type?: string;
  listing_type?: 'sale' | 'rent';
  price_range?: string;
  bedrooms?: string;
}

// Component Props Types
export interface PropertyCardProps {
  property: Property;
  showLocation?: boolean;
  variant?: 'default' | 'compact' | 'featured' | 'grid' | 'list';
  className?: string;
}

export interface LocationCardProps {
  location: Location;
  showDescription?: boolean;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

// SEO and Metadata Types
export interface PropertySEO {
  title: string;
  description: string;
  keywords: string[];
  og_image: string;
  canonical_url: string;
  schema_markup: object;
}

export interface LocationSEO {
  title: string;
  description: string;
  keywords: string[];
  og_image: string;
  canonical_url: string;
}

// Statistics and Analytics Types
export interface PropertyStats {
  total_properties: number;
  properties_for_sale: number;
  properties_for_rent: number;
  featured_properties: number;
  premium_properties: number;
  average_price_sale: number;
  average_price_rent: number;
  popular_locations: string[];
  property_types: { [key: string]: number };
  monthly_views: number;
  monthly_inquiries: number;
}

export interface LocationStats {
  total_locations: number;
  popular_locations: number;
  properties_by_location: { [key: string]: number };
  popular_property_types: string[];
}

export interface DashboardStats {
  properties: PropertyStats;
  locations: LocationStats;
  testimonials: {
    total: number;
    featured: number;
    average_rating: number;
  };
  inquiries: {
    total: number;
    this_month: number;
    pending: number;
  };
}

// Constants
export const PROPERTY_TYPES = [
  'Apartment',
  'Villa',
  'Independent House',
  'Duplex',
  'Penthouse',
  'Studio',
  'Plot/Land'
] as const;

export const FURNISHING_OPTIONS = [
  'Furnished',
  'Semi-Furnished',
  'Unfurnished'
] as const;

export const FACING_OPTIONS = [
  'North',
  'South',
  'East',
  'West',
  'North-East',
  'North-West',
  'South-East',
  'South-West'
] as const;

export const AVAILABILITY_STATUS = [
  'available',
  'sold',
  'rented',
  'under_negotiation'
] as const;

export const INQUIRY_TYPES = [
  'general',
  'property_inquiry',
  'viewing_request',
  'callback_request'
] as const;

export const BLOG_CATEGORIES = [
  'Buying Guide',
  'Market News',
  'Investment Tips',
  'Location Spotlight',
  'Legal Advice',
  'Home Decor',
  'Property Management'
] as const;

// Database utility types
export type PropertyInsert = Omit<Property, 'id' | 'created_at' | 'updated_at' | 'locations' | 'view_count'>;
export type PropertyUpdate = Partial<PropertyInsert>;
export type LocationInsert = Omit<Location, 'id' | 'created_at' | 'updated_at' | 'property_count'>;
export type LocationUpdate = Partial<LocationInsert>;
export type TestimonialInsert = Omit<Testimonial, 'id' | 'created_at'>;
export type TestimonialUpdate = Partial<TestimonialInsert>;
export type BlogInsert = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>;
export type BlogUpdate = Partial<BlogInsert>;

// View types (for database views)
export interface PropertyWithLocations extends Property {
  location_names: string[];
  location_slugs: string[];
}

export interface PopularLocationWithCount extends Location {
  property_count: number;
} 