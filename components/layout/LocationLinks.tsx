"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getLocations } from "@/lib/supabase";
import { Location } from "@/lib/supabase";

const LocationLinks = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsData = await getLocations();
        setLocations(locationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // Comprehensive list of Mumbai locations for SEO
  const additionalLocations = [
    // Prime Mumbai Locations
    { name: "Bandra West", slug: "bandra-west" },
    { name: "Bandra East", slug: "bandra-east" },
    { name: "Juhu", slug: "juhu" },
    { name: "Powai", slug: "powai" },
    { name: "Andheri West", slug: "andheri-west" },
    { name: "Andheri East", slug: "andheri-east" },
    { name: "Lower Parel", slug: "lower-parel" },
    { name: "Worli", slug: "worli" },
    { name: "Prabhadevi", slug: "prabhadevi" },
    { name: "Dadar West", slug: "dadar-west" },
    { name: "Dadar East", slug: "dadar-east" },
    { name: "Matunga", slug: "matunga" },
    { name: "Mahim", slug: "mahim" },
    { name: "Khar West", slug: "khar-west" },
    { name: "Santacruz West", slug: "santacruz-west" },
    { name: "Santacruz East", slug: "santacruz-east" },
    { name: "Vile Parle West", slug: "vile-parle-west" },
    { name: "Vile Parle East", slug: "vile-parle-east" },
    
    // Central Mumbai
    { name: "Colaba", slug: "colaba" },
    { name: "Fort", slug: "fort" },
    { name: "Nariman Point", slug: "nariman-point" },
    { name: "Churchgate", slug: "churchgate" },
    { name: "Marine Drive", slug: "marine-drive" },
    { name: "Tardeo", slug: "tardeo" },
    { name: "Breach Candy", slug: "breach-candy" },
    { name: "Malabar Hill", slug: "malabar-hill" },
    { name: "Cuffe Parade", slug: "cuffe-parade" },
    { name: "Ballard Estate", slug: "ballard-estate" },
    
    // Suburbs
    { name: "Goregaon West", slug: "goregaon-west" },
    { name: "Goregaon East", slug: "goregaon-east" },
    { name: "Malad West", slug: "malad-west" },
    { name: "Malad East", slug: "malad-east" },
    { name: "Kandivali West", slug: "kandivali-west" },
    { name: "Kandivali East", slug: "kandivali-east" },
    { name: "Borivali West", slug: "borivali-west" },
    { name: "Borivali East", slug: "borivali-east" },
    { name: "Dahisar", slug: "dahisar" },
    { name: "Mira Road", slug: "mira-road" },
    { name: "Bhayander", slug: "bhayander" },
    { name: "Vasai", slug: "vasai" },
    { name: "Virar", slug: "virar" },
    
    // Eastern Suburbs
    { name: "Kurla", slug: "kurla" },
    { name: "Ghatkopar West", slug: "ghatkopar-west" },
    { name: "Ghatkopar East", slug: "ghatkopar-east" },
    { name: "Vikhroli", slug: "vikhroli" },
    { name: "Kanjurmarg", slug: "kanjurmarg" },
    { name: "Bhandup", slug: "bhandup" },
    { name: "Mulund", slug: "mulund" },
    { name: "Thane", slug: "thane" },
    { name: "Dombivli", slug: "dombivli" },
    { name: "Kalyan", slug: "kalyan" },
    
    // Navi Mumbai
    { name: "Vashi", slug: "vashi" },
    { name: "Nerul", slug: "nerul" },
    { name: "Belapur", slug: "belapur" },
    { name: "Kharghar", slug: "kharghar" },
    { name: "Panvel", slug: "panvel" },
    { name: "Airoli", slug: "airoli" },
    { name: "Ghansoli", slug: "ghansoli" },
    { name: "Kopar Khairane", slug: "kopar-khairane" }
  ];

  // Combine database locations with additional static locations
  // Filter out duplicates by slug
  const allLocations = [...locations];
  
  // Add static locations that don't exist in the database
  additionalLocations.forEach(loc => {
    if (!allLocations.some(dbLoc => dbLoc.slug === loc.slug)) {
      allLocations.push({
        id: `static-${loc.slug}`,
        name: loc.name,
        slug: loc.slug,
        headline: `Properties in ${loc.name}, Mumbai`,
        content: `Find premium properties for sale and rent in ${loc.name}, Mumbai with Dream House Properties.`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
  });

  return (
    <div className="w-full bg-gray-900 text-white py-6 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-xl font-bold mb-4 text-white relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-600">
          MUMBAI PROPERTIES BY LOCATION
        </h3>
        <div className="flex flex-wrap gap-y-1 mt-4">
          {allLocations.map((location, index) => (
            <Link
              key={location.id}
              href={`/locations/${location.slug}`}
              className="text-gray-300 hover:text-blue-400 transition-colors text-sm md:text-base"
            >
              <span className="mx-1 text-gray-600">|</span>
              Properties in {location.name}
            </Link>
          ))}
          <Link
            href="/locations"
            className="text-gray-300 hover:text-blue-400 transition-colors text-sm md:text-base"
          >
            <span className="mx-1 text-gray-600">|</span>
            All Mumbai Properties
          </Link>
          <span className="mx-1 text-gray-600">|</span>
        </div>
      </div>
    </div>
  );
};

export default LocationLinks;
