# Real Estate Website

A modern, SEO-optimized real estate website built with Next.js, TypeScript, and Supabase. This platform allows users to browse properties for sale and rent, explore different locations, and connect with real estate agencies.

## 🏠 Features

- **Property Listings**: Browse apartments, villas, and other property types
- **Advanced Search & Filters**: Filter by location, price, bedrooms, bathrooms, and more
- **Location-Based Browsing**: Explore properties by specific areas and neighborhoods
- **Agency Profiles**: View real estate agencies and their property portfolios
- **Property Details**: Comprehensive property information with image galleries
- **Contact & Inquiry System**: Direct contact with agencies and property inquiries
- **Blog System**: Real estate tips, market insights, and buying/selling guides
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **SEO Optimized**: Full SEO implementation with meta tags and schema markup

## 🛠️ Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── (main)/            # Main website pages
│   │   ├── properties/    # Property listings and details
│   │   ├── locations/     # Location pages
│   │   ├── agencies/      # Agency pages
│   │   ├── blogs/         # Blog system
│   │   └── ...
│   ├── (admin)/           # Admin dashboard
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── property/          # Property-related components
│   ├── layout/            # Layout components
│   ├── home/              # Homepage components
│   └── ui/                # UI components (shadcn/ui)
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd real-estate-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Set up the database**
   - Go to your Supabase dashboard
   - Run the SQL script from `supabase_real_estate_schema.sql`
   - This will create all necessary tables, policies, and sample data

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The application uses the following main tables:

- **properties**: Property listings with details like price, bedrooms, bathrooms, etc.
- **agencies**: Real estate agencies and developers
- **locations**: Geographic locations and areas
- **property_locations**: Junction table for property-location relationships
- **testimonials**: Customer reviews and testimonials
- **contact_messages**: Contact form submissions
- **blogs**: Blog posts and articles

## 🎨 Customization

### Styling
- Update colors in `tailwind.config.ts`
- Modify components in the `components/` directory
- Update global styles in `app/globals.css`

### Content
- Update homepage content in `app/(main)/page.tsx`
- Modify navigation in `components/layout/Header.tsx`
- Update footer in `components/layout/Footer.tsx`

### SEO
- Update metadata in layout files
- Modify `app/sitemap.ts` for sitemap generation
- Update `app/robots.ts` for robots.txt

## 📝 Migration from Car Rental

This project was migrated from a car rental website. See `MIGRATION_GUIDE.md` for detailed migration steps and what was changed.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Property Types**: Update the property_type enum in the database and filter components
2. **New Locations**: Add locations through the admin panel or directly in the database
3. **New Agencies**: Add agencies through the admin panel
4. **Custom Fields**: Extend the properties table and update TypeScript types

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📚 Documentation

- [Migration Guide](MIGRATION_GUIDE.md) - How this was migrated from car rental
- [Admin Guide](ADMIN_GUIDE.md) - Admin panel usage
- [Context](docs/context.md) - Project requirements and specifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation in the `docs/` folder
- Review the migration guide for common issues
- Open an issue on GitHub

## 🔄 Version History

- **v1.0.0** - Initial real estate website (migrated from car rental)
  - Property listing system
  - Location-based browsing
  - Agency profiles
  - Blog system
  - Admin panel
  - SEO optimization 