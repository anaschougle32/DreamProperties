# Mumbai Real Estate Database Setup

This guide will help you set up the Mumbai real estate database with sample data.

## Prerequisites

1. Supabase project set up
2. Environment variables configured in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Setup Instructions

### Option 1: Manual Setup (Recommended)

1. Open your Supabase dashboard
2. Go to the SQL Editor
3. Copy the contents of `database/mumbai-real-estate-setup.sql`
4. Paste and run the SQL script in the SQL Editor

### Option 2: Using Supabase CLI

If you have Supabase CLI installed:

```bash
supabase db reset
supabase db push
```

## What the Setup Script Does

The setup script will:

1. **Create Tables:**
   - `locations` - Mumbai property locations (Bandra West, Juhu, Powai, etc.)
   - `properties` - Property listings with details
   - `blogs` - Real estate blog posts
   - `testimonials` - Customer testimonials
   - `contact_messages` - Contact form submissions
   - `property_views` - Analytics for property views

2. **Insert Sample Data:**
   - 16 Mumbai locations (Bandra West, Juhu, Powai, Andheri West, etc.)
   - 10+ sample properties across different locations
   - 5 blog posts about Mumbai real estate
   - 6 customer testimonials

3. **Set Up Security:**
   - Row Level Security (RLS) policies
   - Public read access for properties, locations, blogs, testimonials
   - Public insert access for contact messages and property views

4. **Create Indexes:**
   - Performance indexes on commonly queried fields
   - Full-text search capabilities

## Verification

After running the setup, verify the data:

1. Check locations:
   ```sql
   SELECT name, slug FROM locations ORDER BY name;
   ```

2. Check properties:
   ```sql
   SELECT title, location, price FROM properties ORDER BY created_at DESC;
   ```

3. Check blogs:
   ```sql
   SELECT title, category FROM blogs WHERE is_published = true;
   ```

## Features Enabled

After setup, your application will have:

- ✅ Real Mumbai property data
- ✅ Database-driven property listings
- ✅ Location-based property filtering
- ✅ Blog content management
- ✅ Customer testimonials
- ✅ Contact form functionality
- ✅ Property analytics

## Troubleshooting

### Common Issues:

1. **Permission Errors:**
   - Ensure you're using the correct Supabase URL and keys
   - Check that RLS policies are properly set

2. **Data Not Showing:**
   - Verify the tables were created successfully
   - Check that sample data was inserted
   - Ensure your application is connecting to the correct database

3. **Select Component Errors:**
   - The setup fixes empty string values in Select components
   - All Select items now use "any" instead of empty strings

### Reset Database:

If you need to start over:

```sql
-- Run this in Supabase SQL Editor to reset
DROP TABLE IF EXISTS property_views CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS locations CASCADE;
```

Then re-run the setup script.

## Next Steps

1. Run the setup script
2. Start your development server: `npm run dev`
3. Visit `/properties` to see real property data
4. Visit `/locations` to see Mumbai locations
5. Visit `/blogs` to see blog content
6. Test the contact form functionality

Your Mumbai real estate platform is now ready with real data! 