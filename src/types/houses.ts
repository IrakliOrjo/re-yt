export interface House {
    id: number;
    title: string;
    city: string;
    district: string;
    street: string;
    price: number;
    type: 'House' | 'Apartment';
    bedrooms: number;
    bathrooms: number;
    area: number;
    image: string[];
    description: string;
    garage: number;
    parkingSpace: boolean;
    pool: boolean;
    security: boolean;
    yearBuilt: number;
    status: string;
    amenities: string[];
    mapCoordinates: string;
    contactNumber: string;
    email: string;
    agentId: string;
    listingDate: string;
    floor: string;
    heatingType: string;
    AC: boolean;
    furnished: boolean;
    petFriendly: boolean;
    renovation: string;
  }

  export interface HouseStore {
    houses: House[];
    filteredHouses: House[];
    filters: HouseFilters;
    loading: boolean;
    error: null | string;
    updateFilters: (filterUpdate: Partial<HouseFilters>) => void;
    toggleAmenity: (amenity: string) => void;
    clearFilters: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
  }

  export interface HouseFilters {
    minPrice?: number | string;
    maxPrice?: number | string;
    bedrooms?: number | string;
    bathrooms?: number | string;
    type?: 'House' | 'Apartment' | 'All';
    city?: string;
    minArea?: number | string;
    maxArea?: number | string;
    amenities?: string[];
    searchQuery?:string
    locationQuery?:string;
  }