import { create } from 'zustand'
import { House, HouseFilters, HouseStore } from '../types/houses';
import { houses as initialHouses } from '../const/houses';

const initialFilters: HouseFilters = {
  minPrice: undefined,
  maxPrice: undefined,
  bedrooms: undefined,
  bathrooms: undefined,
  type: 'All',
  city: undefined,
  minArea: undefined,
  maxArea: undefined,
  amenities: undefined,
  searchQuery: undefined,
  locationQuery: ''
};

const useHouseStore = create<HouseStore>((set, get) => ({
  houses: initialHouses as House[],
  filteredHouses: initialHouses as House[],
  filters: initialFilters,
  loading: false,
  error: null,

  updateFilters: (filterUpdate: Partial<HouseFilters>) => {
    const currentState = get();
    const newFilters = { ...currentState.filters, ...filterUpdate };
    
    let filtered = currentState.houses;

    // Apply numeric range filters
    if (newFilters.minPrice !== undefined && newFilters.minPrice !== '') {
      const minPriceNum = Number(newFilters.minPrice);
      if (!isNaN(minPriceNum)) {
        filtered = filtered.filter(house => house.price >= minPriceNum);
      }
    }
    if (newFilters.maxPrice !== undefined && newFilters.maxPrice !== '') {
      const maxPriceNum = Number(newFilters.maxPrice);
      if (!isNaN(maxPriceNum)) {
        filtered = filtered.filter(house => house.price <= maxPriceNum);
      }
    }
    if (newFilters.minArea !== undefined && newFilters.minArea !== '') {
      const minAreaNum = Number(newFilters.minArea);
      if (!isNaN(minAreaNum)) {
        filtered = filtered.filter(house => house.area >= minAreaNum);
      }
    }
    if (newFilters.maxArea !== undefined && newFilters.maxArea !== '') {
      const maxAreaNum = Number(newFilters.maxArea);
      if (!isNaN(maxAreaNum)) {
        filtered = filtered.filter(house => house.area <= maxAreaNum);
      }
    }

    // Apply exact match filters
    if (newFilters.bedrooms !== undefined) {
      filtered = filtered.filter(house => house.bedrooms === newFilters.bedrooms);
    }
    if (newFilters.bathrooms !== undefined) {
      filtered = filtered.filter(house => house.bathrooms === newFilters.bathrooms);
    }
    if (newFilters.type !== undefined) {
      filtered = filtered.filter(house => {
        if(newFilters.type === 'All') return true;
        if(house.type === newFilters.type) return true;
      });
    }

    // Apply city filter
    if (newFilters.city) {
      filtered = filtered.filter(house => 
        house.city.toLowerCase().includes(newFilters.city!.toLowerCase())
      );
    }

    // Apply amenities filter
    if (newFilters.amenities && newFilters.amenities.length > 0) {
      console.log('newFilters.amenities', newFilters.amenities);
      filtered = filtered.filter(house => 
        
        newFilters.amenities!.some(amenity => 
        {
          console.log('amenity', amenity);
          console.log('house.amenities', house.amenities);
          console.log('house.amenities.includes(amenity)', house.amenities.includes(amenity));

          return house.amenities.includes(amenity)
        }
        )
      );
    }

    // Apply search query
    if (newFilters.searchQuery) {
      const query = newFilters.searchQuery.toLowerCase();
      filtered = filtered.filter(house =>
        house.title.toLowerCase().includes(query)
      );
    }

    // Apply location query
    if (newFilters.locationQuery) {
      const query = newFilters.locationQuery.toLowerCase();
      filtered = filtered.filter(house =>
        house.city.toLowerCase().includes(query) ||
        house.street.toLowerCase().includes(query) ||
        house.district.toLowerCase().includes(query)
      );
    }
    

    set({
      filters: newFilters,
      filteredHouses: filtered
    });
  },
  toggleAmenity: (amenity: string) => {
    const currentFilters = get().filters;
    const currentAmenities = currentFilters.amenities || [];
    console.log('currentAmenities', currentAmenities);
    
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];

     console.log('newAmenities', newAmenities); 
    
    get().updateFilters({ amenities: newAmenities });
  },

  clearFilters: () => {
    set(state => ({
      filters: initialFilters,
      filteredHouses: state.houses
    }));
  },

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error })
}));

export default useHouseStore;