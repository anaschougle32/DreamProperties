// Car Types
export interface CarFeature {
  icon: string;
  name: string;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  slug: string;
  price_per_day: number;
  description: string;
  features: CarFeature[];
  fuel_type: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  min_days: number;
  main_image?: string;
  images?: string[];
  category: 'Hatchback' | 'Sedan' | 'SUV' | 'Luxury' | 'Premium';
  mileage?: number; // Vehicle mileage in kilometers per liter
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  city: string;
  message: string;
  stars: number;
  image?: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  excerpt?: string; // Short excerpt for previews
  content: string;
  cover_image: string;
  date?: string; // Legacy date field
  created_at?: string; // ISO date string when the blog was created
  updated_at?: string; // ISO date string when the blog was last updated
  published?: boolean; // Whether the blog is published
  is_published?: boolean; // Alternative published field
  author?: string; // Author name
  category?: string; // Blog category
  tags?: string[]; // Blog tags
  views?: number; // View count
  reading_time?: number; // Estimated reading time in minutes
}

// Property Types
export interface Property {
  id: string;
  title: string;
  slug: string;
  price: number;
  listing_type: 'sale' | 'rent';
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  location: string;
  description?: string;
  features?: string[];
  amenities?: string[];
  main_image?: string;
  images?: string[];
  is_featured?: boolean;
  is_premium?: boolean;
  furnishing?: string;
  availability_status?: string;
  year_built?: number;
  floor_number?: number;
  total_floors?: number;
  facing?: string;
  parking?: number;
  balconies?: number;
  video_tour?: string;
  virtual_tour?: string;
  created_at?: string;
  updated_at?: string;
}

// Location Types
export interface Location {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  highlights?: string[];
  is_popular?: boolean;
  property_count?: number;
  created_at?: string;
  updated_at?: string;
}

// Contact Message Types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  property_interest?: string;
  created_at?: string;
}

// Property View Analytics
export interface PropertyView {
  id: string;
  property_id: string;
  user_ip?: string;
  user_agent?: string;
  referrer?: string;
  viewed_at: string;
}

// Search and Filter Types
export interface PropertySearchFilters {
  listing_type?: 'sale' | 'rent';
  property_type?: string[];
  location?: string[];
  price_min?: number;
  price_max?: number;
  bedrooms?: number[];
  bathrooms?: number[];
  area_min?: number;
  area_max?: number;
  furnishing?: string[];
  amenities?: string[];
  is_featured?: boolean;
  is_premium?: boolean;
}

// Constants
export const PROPERTY_TYPES = [
  'Apartment',
  'Villa',
  'Independent House',
  'Duplex',
  'Penthouse',
  'Studio',
  'Plot',
  'Commercial'
] as const;

export const FURNISHING_OPTIONS = [
  'Fully Furnished',
  'Semi Furnished',
  'Unfurnished'
] as const;

export const LISTING_TYPES = [
  'sale',
  'rent'
] as const;