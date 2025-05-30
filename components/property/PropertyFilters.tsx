"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X, Filter, MapPin, Home, Bed, Bath, Square, TrendingUp } from 'lucide-react';

const LOCATIONS = [
  'Bandra West', 'Juhu', 'Powai', 'Andheri West', 'Lower Parel', 
  'Worli', 'Malad West', 'Thane West', 'Khar West', 'Santacruz West'
];

const PROPERTY_TYPES = [
  'Apartment', 'Villa', 'Independent House', 'Duplex', 'Penthouse', 'Studio'
];

const AMENITIES = [
  'Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden', 'Elevator',
  'Power Backup', 'Water Supply', 'Club House', 'Children Play Area',
  'Jogging Track', 'CCTV', 'Intercom', 'Fire Safety'
];

const FURNISHING_OPTIONS = [
  'Fully Furnished', 'Semi Furnished', 'Unfurnished'
];

interface FilterState {
  listingType: string;
  locations: string[];
  propertyTypes: string[];
  priceRange: [number, number];
  bedrooms: string;
  bathrooms: string;
  areaRange: [number, number];
  furnishing: string[];
  amenities: string[];
  ageOfProperty: string;
  facing: string;
  floor: string;
}

export default function PropertyFilters() {
  const [filters, setFilters] = useState<FilterState>({
    listingType: 'any',
    locations: [],
    propertyTypes: [],
    priceRange: [1000000, 100000000], // 10L to 10Cr
    bedrooms: 'any',
    bathrooms: 'any',
    areaRange: [500, 5000], // 500 to 5000 sqft
    furnishing: [],
    amenities: [],
    ageOfProperty: 'any',
    facing: 'any',
    floor: 'any'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleLocationChange = (location: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      locations: checked 
        ? [...prev.locations, location]
        : prev.locations.filter(l => l !== location)
    }));
  };

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      propertyTypes: checked 
        ? [...prev.propertyTypes, type]
        : prev.propertyTypes.filter(t => t !== type)
    }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      amenities: checked 
        ? [...prev.amenities, amenity]
        : prev.amenities.filter(a => a !== amenity)
    }));
  };

  const handleFurnishingChange = (furnishing: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      furnishing: checked 
        ? [...prev.furnishing, furnishing]
        : prev.furnishing.filter(f => f !== furnishing)
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      listingType: 'any',
      locations: [],
      propertyTypes: [],
      priceRange: [1000000, 100000000],
      bedrooms: 'any',
      bathrooms: 'any',
      areaRange: [500, 5000],
      furnishing: [],
      amenities: [],
      ageOfProperty: 'any',
      facing: 'any',
      floor: 'any'
    });
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.locations.length > 0) count++;
    if (filters.propertyTypes.length > 0) count++;
    if (filters.bedrooms) count++;
    if (filters.bathrooms) count++;
    if (filters.furnishing.length > 0) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.ageOfProperty) count++;
    if (filters.facing) count++;
    if (filters.floor) count++;
    return count;
  };

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary" className="ml-2">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </div>
        {getActiveFiltersCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-blue-600 hover:text-blue-700"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Listing Type */}
      <Card className="p-4">
        <Label className="text-sm font-medium text-gray-900 mb-3 block">
          Looking For
        </Label>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setFilters(prev => ({ ...prev, listingType: 'sale' }))}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              filters.listingType === 'sale'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Buy Property
          </button>
          <button
            onClick={() => setFilters(prev => ({ ...prev, listingType: 'rent' }))}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              filters.listingType === 'rent'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Rent Property
          </button>
        </div>
      </Card>

      {/* Price Range */}
      <Card className="p-4">
        <Label className="text-sm font-medium text-gray-900 mb-3 block flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Price Range
        </Label>
        <div className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
            max={100000000}
            min={1000000}
            step={1000000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </Card>

      {/* Locations */}
      <Card className="p-4">
        <Label className="text-sm font-medium text-gray-900 mb-3 block flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Mumbai Locations
        </Label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {LOCATIONS.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${location}`}
                checked={filters.locations.includes(location)}
                onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
              />
              <Label
                htmlFor={`location-${location}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {location}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      {/* Property Type */}
      <Card className="p-4">
        <Label className="text-sm font-medium text-gray-900 mb-3 block flex items-center gap-2">
          <Home className="w-4 h-4" />
          Property Type
        </Label>
        <div className="space-y-2">
          {PROPERTY_TYPES.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.propertyTypes.includes(type)}
                onCheckedChange={(checked) => handlePropertyTypeChange(type, checked as boolean)}
              />
              <Label
                htmlFor={`type-${type}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      {/* Bedrooms & Bathrooms */}
      <Card className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-900 mb-2 block flex items-center gap-2">
              <Bed className="w-4 h-4" />
              Bedrooms
            </Label>
            <Select value={filters.bedrooms} onValueChange={(value) => setFilters(prev => ({ ...prev, bedrooms: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1 BHK</SelectItem>
                <SelectItem value="2">2 BHK</SelectItem>
                <SelectItem value="3">3 BHK</SelectItem>
                <SelectItem value="4">4 BHK</SelectItem>
                <SelectItem value="5">5+ BHK</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-900 mb-2 block flex items-center gap-2">
              <Bath className="w-4 h-4" />
              Bathrooms
            </Label>
            <Select value={filters.bathrooms} onValueChange={(value) => setFilters(prev => ({ ...prev, bathrooms: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Area Range */}
      <Card className="p-4">
        <Label className="text-sm font-medium text-gray-900 mb-3 block flex items-center gap-2">
          <Square className="w-4 h-4" />
          Area (sq ft)
        </Label>
        <div className="space-y-4">
          <Slider
            value={filters.areaRange}
            onValueChange={(value) => setFilters(prev => ({ ...prev, areaRange: value as [number, number] }))}
            max={5000}
            min={500}
            step={100}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{filters.areaRange[0]} sqft</span>
            <span>{filters.areaRange[1]} sqft</span>
          </div>
        </div>
      </Card>

      {/* Advanced Filters Toggle */}
      <Button
        variant="outline"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full"
      >
        {isExpanded ? 'Hide' : 'Show'} Advanced Filters
      </Button>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="space-y-6">
          {/* Furnishing */}
          <Card className="p-4">
            <Label className="text-sm font-medium text-gray-900 mb-3 block">
              Furnishing
            </Label>
            <div className="space-y-2">
              {FURNISHING_OPTIONS.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`furnishing-${option}`}
                    checked={filters.furnishing.includes(option)}
                    onCheckedChange={(checked) => handleFurnishingChange(option, checked as boolean)}
                  />
                  <Label
                    htmlFor={`furnishing-${option}`}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </Card>

          {/* Amenities */}
          <Card className="p-4">
            <Label className="text-sm font-medium text-gray-900 mb-3 block">
              Amenities
            </Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {AMENITIES.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={filters.amenities.includes(amenity)}
                    onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                  />
                  <Label
                    htmlFor={`amenity-${amenity}`}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </Card>

          {/* Additional Filters */}
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-2 block">
                  Age of Property
                </Label>
                <Select value={filters.ageOfProperty} onValueChange={(value) => setFilters(prev => ({ ...prev, ageOfProperty: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="new">Under Construction</SelectItem>
                    <SelectItem value="0-1">0-1 Years</SelectItem>
                    <SelectItem value="1-5">1-5 Years</SelectItem>
                    <SelectItem value="5-10">5-10 Years</SelectItem>
                    <SelectItem value="10+">10+ Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900 mb-2 block">
                  Facing
                </Label>
                <Select value={filters.facing} onValueChange={(value) => setFilters(prev => ({ ...prev, facing: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="north">North</SelectItem>
                    <SelectItem value="south">South</SelectItem>
                    <SelectItem value="east">East</SelectItem>
                    <SelectItem value="west">West</SelectItem>
                    <SelectItem value="north-east">North-East</SelectItem>
                    <SelectItem value="north-west">North-West</SelectItem>
                    <SelectItem value="south-east">South-East</SelectItem>
                    <SelectItem value="south-west">South-West</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900 mb-2 block">
                  Floor
                </Label>
                <Select value={filters.floor} onValueChange={(value) => setFilters(prev => ({ ...prev, floor: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="ground">Ground Floor</SelectItem>
                    <SelectItem value="1-3">1-3 Floor</SelectItem>
                    <SelectItem value="4-7">4-7 Floor</SelectItem>
                    <SelectItem value="8-15">8-15 Floor</SelectItem>
                    <SelectItem value="15+">15+ Floor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Apply Filters Button */}
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
        Apply Filters
      </Button>

      {/* Active Filters Display */}
      {getActiveFiltersCount() > 0 && (
        <Card className="p-4">
          <Label className="text-sm font-medium text-gray-900 mb-3 block">
            Active Filters
          </Label>
          <div className="flex flex-wrap gap-2">
            {filters.locations.map((location) => (
              <Badge key={location} variant="secondary" className="flex items-center gap-1">
                {location}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => handleLocationChange(location, false)}
                />
              </Badge>
            ))}
            {filters.propertyTypes.map((type) => (
              <Badge key={type} variant="secondary" className="flex items-center gap-1">
                {type}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => handlePropertyTypeChange(type, false)}
                />
              </Badge>
            ))}
            {filters.bedrooms && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.bedrooms} BHK
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => setFilters(prev => ({ ...prev, bedrooms: 'any' }))}
                />
              </Badge>
            )}
            {filters.bathrooms && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.bathrooms} Bath
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => setFilters(prev => ({ ...prev, bathrooms: 'any' }))}
                />
              </Badge>
            )}
          </div>
        </Card>
      )}
    </div>
  );
} 