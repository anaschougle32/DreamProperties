# Real Estate Website Project Requirements

## Tech Stack

- **Framework**: Next.js (App Router + File-Based Routing)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend/Database**: Supabase (PostgreSQL DB + Auth + File Storage)

## General Development Requirements

- Fully SEO-optimized pages (Title, Meta, OpenGraph, Schema Markup)
- Fast load times, image optimization using Next.js Image component
- Responsive Design (Mobile, Tablet, Desktop)
- Accessibility-friendly (use semantic HTML and aria-tags)
- Clean, maintainable code structure
- Use Layouts for reusable parts (navbar, footer, meta tags)
- Use app/ directory routing system of Next.js
- Use Supabase for property data, agencies, user contact messages, and file storage (e.g. property images)

## Pages Required

### 1. Homepage
- Hero Section: Background image + Headline + CTA ("View Properties" / "Find Your Dream Home")
- Search Properties form (with property type, location, price range, bedrooms)
- About section
- Metrics section (Properties Sold, Happy Clients, Years of Experience, Agencies)
- Process Steps (Search -> Schedule Visit -> Negotiate -> Close Deal)
- Featured Properties (Property cards in categories: Sale/Rent, Apartment/Villa)
- Why Choose Us (Icons + text)
- Testimonials (Slider)
- CTA Banner (e.g. Premium Property Services)
- Blog Highlights (3 latest blogs)
- Footer with contact, links, social

### 2. Property Listing Page (/properties)
- Filters (Location, Property Type, Price Range, Bedrooms, Bathrooms, Listing Type)
- Grid of properties with basic info (title, image, price, location, bedrooms/bathrooms, CTA to view more)
- Pagination / Infinite scroll (Optional)
- Map view toggle (Optional)

### 3. Single Property Details Page (/properties/[slug])
- Property images (carousel)
- Property details (bedrooms, bathrooms, area, furnishing, floor, facing, year built)
- Agency information
- Price and listing type (Sale/Rent)
- Features list
- Location information
- Contact CTA (WhatsApp, Call, or Inquiry Form)
- Related properties section
- Virtual tour (Optional)

### 4. Locations Page (/locations)
- Grid of available locations
- Location cards with property count and highlights
- Search functionality

### 5. Single Location Page (/locations/[slug])
- Location overview and content
- Properties available in this location
- Location highlights and amenities
- Nearby facilities (schools, hospitals, shopping)

### 6. Agencies Page (/agencies)
- Grid of partner agencies
- Agency cards with logo, name, and property count

### 7. About Page (/about)
- Company story, mission, and unique value proposition
- Team photos and bios
- Awards and certifications
- Service areas

### 8. Contact Page (/contact)
- Contact Form (Name, Email, Phone, Message, Property Interest) -> Store in Supabase
- Company contact info
- Office locations
- Embedded map

### 9. Blog Listing Page (/blogs)
- Blog posts with real estate tips, market insights, and guides
- Thumbnail + title + excerpt + read more
- Categories (Market News, Buying Guide, Selling Tips, Investment)

### 10. Single Blog Page (/blogs/[slug])
- Rich content support (Headings, Images, Code blocks, Tables)
- SEO optimized with proper schema and OpenGraph data
- Related articles
- Social sharing

### 11. 404 Not Found Page
- Custom design for a better user experience

## Supabase Database Schema

### Core Tables:
- **agencies**: Real estate agencies/developers (id, name, logo, created_at)
- **properties**: Property listings (id, title, slug, agency_id, price, listing_type, property_type, bedrooms, bathrooms, area_sqft, furnishing, availability_status, year_built, facing, floor_number, total_floors, description, features, main_image, images, created_at)
- **locations**: Geographic locations (id, name, slug, headline, content, created_at, updated_at)
- **property_locations**: Junction table for property-location relationships
- **testimonials**: Customer reviews and testimonials
- **contact_messages**: Contact form submissions
- **blogs**: Blog posts and articles

### Storage Buckets:
- **property-images**: Property photos and virtual tour assets
- **blog-images**: Blog post images and featured images
- **agency-logos**: Agency logos and branding assets

## Components to Be Reused/Updated
- Navbar (update navigation links)
- Footer (update with real estate specific links)
- PropertyCard (was CarCard - update for property info)
- PropertyFilter (was CarFilter - update for property filters)
- InquiryCTA (was BookingCTA - update for property inquiry)
- TestimonialCard (reuse as-is)
- LocationCard (new component)
- AgencyCard (new component)
- SectionWrapper (reuse as-is)
- BlogCard (reuse as-is)
- PropertyGallery (new component for image carousel)
- SearchForm (update for property search)

## SEO & Performance Practices
- Use next/head or metadata API for SEO tags
- Use robots.txt and sitemap.xml
- Use Image from next/image for optimization
- Lazy load sections when necessary
- Clean URL structure with readable slugs
- Open Graph & Twitter card setup
- Schema markup for properties (Real Estate schema)
- Local SEO optimization for location-based searches

## Key Features for Real Estate
- Property search and filtering
- Location-based property browsing
- Agency/developer profiles
- Property inquiry system
- Property comparison (Optional)
- Saved properties/wishlist (Optional)
- Property alerts/notifications (Optional)
- Mortgage calculator (Optional)
- Virtual property tours (Optional)
- Property valuation tools (Optional)

## Content Strategy
- Market insights and trends
- Buying/selling guides
- Investment advice
- Location spotlights
- Property maintenance tips
- Legal and documentation guides

## Migration from Car Rental
### Data Migration:
- Cars → Properties
- Brands → Agencies
- Car features → Property features
- Rental pricing → Sale/Rent pricing
- Locations (adapt existing location system)

### UI/UX Updates:
- Color scheme and branding for real estate
- Property-focused imagery and icons
- Real estate specific terminology
- Property listing layouts
- Search and filter adaptations

## Project Priorities
- Mobile responsive design
- SEO optimization (highest priority)
- Property search functionality
- Location-based browsing
- Agency integration
- Contact and inquiry system 