# Migration Guide: Car Rental → Real Estate Website

## Overview
This guide outlines the steps to transform the existing car rental website into a real estate website using the new database schema and requirements.

## 1. Database Migration

### 1.1 Backup Current Data
```bash
# Export current data if needed
# Run this in your Supabase SQL editor before applying new schema
```

### 1.2 Apply New Schema
```bash
# Run the new real estate schema
psql -f supabase_real_estate_schema.sql
```

### 1.3 Data Transformation
- **Cars → Properties**: Transform car listings to property listings
- **Brands → Agencies**: Convert car brands to real estate agencies
- **Car locations → Property locations**: Adapt location system
- **Testimonials**: Keep but update content for real estate context
- **Blogs**: Update content to real estate topics

## 2. File and Folder Renaming

### 2.1 Components
```
components/car/ → components/property/
components/car/CarCard.tsx → components/property/PropertyCard.tsx
components/car/CarFilter.tsx → components/property/PropertyFilter.tsx
components/car/CarGallery.tsx → components/property/PropertyGallery.tsx
```

### 2.2 Pages
```
app/(main)/cars/ → app/(main)/properties/
app/(main)/cars/[slug]/ → app/(main)/properties/[slug]/
```

### 2.3 Types
```
types/car.ts → types/property.ts (delete old, use new real-estate.ts)
```

### 2.4 API Routes
```
app/api/cars/ → app/api/properties/
app/api/brands/ → app/api/agencies/
```

## 3. Component Updates

### 3.1 Navigation Updates
**File**: `components/layout/Navbar.tsx`
```typescript
// Update navigation links
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Properties' }, // was /cars
  { href: '/locations', label: 'Locations' },
  { href: '/agencies', label: 'Agencies' }, // new
  { href: '/about', label: 'About' },
  { href: '/blogs', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];
```

### 3.2 PropertyCard Component
**File**: `components/property/PropertyCard.tsx`
```typescript
import { Property } from '@/types/real-estate';

interface PropertyCardProps {
  property: Property;
  showLocation?: boolean;
  showAgency?: boolean;
}

export function PropertyCard({ property, showLocation, showAgency }: PropertyCardProps) {
  return (
    <div className="property-card">
      {/* Update to show property details instead of car details */}
      <div className="property-info">
        <h3>{property.title}</h3>
        <p>₹{property.price.toLocaleString()}</p>
        <div className="property-details">
          <span>{property.bedrooms} Bed</span>
          <span>{property.bathrooms} Bath</span>
          <span>{property.area_sqft} sqft</span>
        </div>
        {showLocation && property.locations && (
          <p>{property.locations[0]?.name}</p>
        )}
        {showAgency && property.agency && (
          <p>{property.agency.name}</p>
        )}
      </div>
    </div>
  );
}
```

### 3.3 PropertyFilter Component
**File**: `components/property/PropertyFilter.tsx`
```typescript
// Update filters for real estate
const propertyTypes = ['Apartment', 'Villa', 'Independent House', 'Duplex'];
const listingTypes = ['sale', 'rent'];
const bedroomOptions = ['1', '2', '3', '4', '5+'];
```

## 4. Page Updates

### 4.1 Homepage Updates
**File**: `app/(main)/page.tsx`
- Update hero section copy
- Change "Book Now" to "View Properties"
- Update search form for property search
- Update metrics (Properties Sold, Happy Clients, etc.)
- Update process steps (Search → Visit → Negotiate → Close)

### 4.2 Property Listing Page
**File**: `app/(main)/properties/page.tsx`
```typescript
// Update to fetch properties instead of cars
const properties = await getProperties({
  location,
  property_type,
  listing_type,
  min_price,
  max_price,
  bedrooms,
});
```

### 4.3 Property Details Page
**File**: `app/(main)/properties/[slug]/page.tsx`
```typescript
// Update to show property details
export default function PropertyPage({ params }: { params: { slug: string } }) {
  // Fetch property by slug
  // Show property gallery, details, agency info, contact form
}
```

### 4.4 New Pages to Create
- **Agencies Page**: `app/(main)/agencies/page.tsx`
- **Agency Details**: `app/(main)/agencies/[slug]/page.tsx`
- **Location Details**: `app/(main)/locations/[slug]/page.tsx`

## 5. API Route Updates

### 5.1 Properties API
**File**: `app/api/properties/route.ts`
```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters = {
    location: searchParams.get('location'),
    property_type: searchParams.get('property_type'),
    listing_type: searchParams.get('listing_type'),
    // ... other filters
  };
  
  const properties = await getProperties(filters);
  return Response.json(properties);
}
```

### 5.2 Agencies API
**File**: `app/api/agencies/route.ts`
```typescript
// New API for agencies
export async function GET() {
  const agencies = await getAgencies();
  return Response.json(agencies);
}
```

## 6. Utility Functions

### 6.1 Supabase Queries
**File**: `lib/supabase/properties.ts`
```typescript
export async function getProperties(filters: PropertyFilters) {
  let query = supabase
    .from('properties')
    .select(`
      *,
      agency:agencies(*),
      locations:property_locations(location:locations(*))
    `);

  if (filters.location) {
    query = query.eq('property_locations.location_id', filters.location);
  }
  
  // Add other filters...
  
  const { data, error } = await query;
  return data;
}
```

## 7. Content Updates

### 7.1 SEO and Meta Tags
Update all meta descriptions, titles, and keywords to reflect real estate content:
```typescript
// Update in layout.tsx and page components
export const metadata = {
  title: 'Find Your Dream Property | Real Estate Website',
  description: 'Discover premium properties for sale and rent...',
  keywords: 'real estate, properties, apartments, villas, bangalore',
};
```

### 7.2 Static Content
- Update footer links and content
- Update about page content
- Update blog categories and sample posts
- Update testimonials content

## 8. Styling Updates

### 8.1 Color Scheme
Update the color scheme in `tailwind.config.ts` to reflect real estate branding:
```typescript
colors: {
  primary: {
    // Update to real estate colors (e.g., green, blue, gold)
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
    // ...
  }
}
```

### 8.2 Icons and Images
- Replace car icons with property/home icons
- Update hero images to real estate photos
- Update placeholder images throughout

## 9. Configuration Updates

### 9.1 Next.js Config
**File**: `next.config.js`
```javascript
// Update image domains for property images
images: {
  domains: [
    'your-property-images-domain.com',
    // ... other domains
  ],
},
```

### 9.2 Sitemap Updates
**File**: `app/sitemap.ts`
```typescript
// Update sitemap to include new routes
return [
  {
    url: 'https://yoursite.com/properties',
    lastModified: new Date(),
  },
  {
    url: 'https://yoursite.com/agencies',
    lastModified: new Date(),
  },
  // ... other routes
];
```

## 10. Testing Checklist

### 10.1 Functionality Testing
- [ ] Property search and filtering works
- [ ] Property detail pages load correctly
- [ ] Agency pages work
- [ ] Location pages work
- [ ] Contact forms submit correctly
- [ ] Blog functionality unchanged

### 10.2 SEO Testing
- [ ] Meta tags updated on all pages
- [ ] Schema markup for properties
- [ ] Sitemap includes new routes
- [ ] Robots.txt updated if needed

### 10.3 Responsive Testing
- [ ] All new components responsive
- [ ] Property cards display correctly on mobile
- [ ] Filters work on mobile devices

## 11. Deployment Steps

### 11.1 Environment Variables
Update environment variables for:
- Supabase URL and keys
- Any new API integrations
- Image storage configurations

### 11.2 Vercel/Deployment Config
- Update build commands if needed
- Configure new redirects for SEO
- Set up monitoring for new routes

## 12. Git Repository Reinitialization

```bash
# Backup current history
git branch backup-car-rental

# Create new initial commit for real estate
git checkout --orphan real-estate-main
git add .
git commit -m "Initial commit: Real Estate Website"

# Push new branch
git push origin real-estate-main

# Set as default branch if desired
```

## Notes
- Keep the backup branch (`backup-car-rental`) until you're satisfied with the migration
- Test thoroughly in development before deploying
- Consider running both versions temporarily during transition
- Update any external integrations (analytics, etc.) to reflect new property-focused tracking 