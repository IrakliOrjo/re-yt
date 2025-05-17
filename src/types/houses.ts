import { Property } from "../services/api";



  export interface HouseStore {
    houses: Property[];
    filteredHouses: Property[];
    filters: HouseFilters;
    loading: boolean;
    error: null | string;
    currentHouse: Property | null;
    updateFilters: (filterUpdate: Partial<HouseFilters>) => void;
    fetchHouseById: (id: string) => Promise<void>;
    toggleAmenity: (amenity: string) => void;
    clearFilters: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    fetchHouses: () => Promise<void>;
    searchPropertiesAPI: () => Promise<void>
  }

  export type HouseType = 'house' | 'appartment' | 'all'

  export interface HouseFilters {
    minPrice?: number | string;
    maxPrice?: number | string;
    bedrooms?: number | string;
    bathrooms?: number | string;
    type: HouseType;
    city?: string;
    minArea?: number | string;
    maxArea?: number | string;
    status: 'Sale' | 'Rent'
    amenities?: string[];
    searchQuery?:string
    locationQuery?:string;
  
  }