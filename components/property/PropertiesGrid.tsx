"use client";

import { useState, useEffect } from 'react';
import { getProperties } from '@/lib/supabase';
import { Property } from '@/lib/types';
import PropertyCard from '@/components/property/PropertyCard';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';

export default function PropertiesGrid() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const PROPERTIES_PER_PAGE = 12;

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async (pageNum = 1, append = false) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      const { data, error: fetchError } = await getProperties({
        page: pageNum,
        limit: PROPERTIES_PER_PAGE,
        filters: {
          availability_status: 'available'
        }
      });

      if (fetchError) {
        throw new Error(typeof fetchError === 'string' ? fetchError : 'Failed to fetch properties');
      }

      if (data) {
        if (append) {
          setProperties(prev => [...prev, ...data]);
        } else {
          setProperties(data);
        }
        
        // Check if there are more properties to load
        setHasMore(data.length === PROPERTIES_PER_PAGE);
      }
    } catch (err) {
      console.error('Error loading properties:', err);
      setError(err instanceof Error ? err.message : 'Failed to load properties');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadProperties(nextPage, true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
        <p className="text-lg text-gray-600">Loading properties...</p>
        <p className="text-sm text-gray-500 mt-2">Finding the best properties in Mumbai for you</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
        <p className="text-lg text-gray-600 mb-2">Failed to load properties</p>
        <p className="text-sm text-gray-500 mb-4">{error}</p>
        <Button onClick={() => loadProperties()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-4">
            We couldn't find any properties matching your criteria. Try adjusting your filters or check back later.
          </p>
          <Button onClick={() => loadProperties()} variant="outline">
            Refresh Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Properties Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {properties.length} properties in Mumbai
        </p>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-8">
          <Button 
            onClick={loadMore} 
            disabled={loadingMore}
            size="lg"
            className="px-8"
          >
            {loadingMore ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading More...
              </>
            ) : (
              'Load More Properties'
            )}
          </Button>
        </div>
      )}

      {/* No More Properties Message */}
      {!hasMore && properties.length > 0 && (
        <div className="text-center pt-8">
          <p className="text-gray-500">You've seen all available properties</p>
        </div>
      )}
    </div>
  );
} 