export interface Agency {
  id: string;
  name: string;
  logo: string | null;
  created_at: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  agency_id: string | null;
  agency?: Agency;
  price: number;
  listing_type: 'sale' | 'rent';
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  furnishing: string | null;
  availability_status: string;
  year_built: number | null;
  facing: string | null;
  floor_number: number | null;
  total_floors: number | null;
  description: string | null;
  features: string[];
  main_image: string | null;
  images: string[];
  created_at: string;
  locations?: Location[];
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  headline: string;
  content: string;
  created_at: string;
  updated_at: string;
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
  rating: number;
  comment: string;
  image: string | null;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author: string;
  category: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // SEO fields
  meta_title?: string;
  meta_description?: string;
  // Social sharing
  social_image?: string | null;
  // Additional fields
  tags?: string[];
  views?: number;
  featured?: boolean;
  reading_time?: number;
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
  agency_id?: string;
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
  page?: string;
  limit?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'oldest' | 'area_asc' | 'area_desc';
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

export interface AgencyWithProperties extends Agency {
  properties: Property[];
  property_count: number;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  property_interest?: string;
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
  showAgency?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

export interface LocationCardProps {
  location: Location;
  property_count?: number;
  showDescription?: boolean;
}

export interface AgencyCardProps {
  agency: Agency;
  property_count?: number;
  showProperties?: boolean;
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
  average_price_sale: number;
  average_price_rent: number;
  popular_locations: string[];
  property_types: { [key: string]: number };
}

export interface LocationStats {
  total_locations: number;
  properties_by_location: { [key: string]: number };
  popular_property_types: string[];
}

// Database utility types
export type PropertyInsert = Omit<Property, 'id' | 'created_at' | 'agency' | 'locations'>;
export type PropertyUpdate = Partial<PropertyInsert>;
export type LocationInsert = Omit<Location, 'id' | 'created_at' | 'updated_at'>;
export type LocationUpdate = Partial<LocationInsert>; 