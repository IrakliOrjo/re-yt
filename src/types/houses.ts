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
    titleQuery: string;
    locationQuery: string;
    realtyType: string;
    loading: boolean;
    error: string | null;

    // Filters
 
    setLocationQuery: (query: string) => void;
    setTitleQuery: (query: string) => void;
    setType: (query: string) => void;
    setSearchTitle: (query: string) => House[];
    setSearchLocation: (query: string) => House[];
    clearFilters: () => void;
    applyAllFilters: () =>  House[];
    
    // Loading states
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

  export interface HouseFilters {
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    type?: 'House' | 'Apartment';
    city?: string;
    minArea?: number;
    maxArea?: number;
    amenities?: string[];
    searchQuery?:string;
    locationQuery?:string;
  }