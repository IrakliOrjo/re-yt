import { create } from 'zustand'
import {  HouseFilters, HouseStore } from '../types/houses';
import { getAllProperties, getPropertyById, searchProperties } from '../services/api';

const initialFilters: HouseFilters = {
  minPrice: undefined,
  maxPrice: undefined,
  bedrooms: undefined,
  bathrooms: undefined,
  type: 'all',
  status: 'Sale',
  city: undefined,
  minArea: undefined,
  maxArea: undefined,
  amenities: undefined,
  searchQuery: undefined,
  locationQuery: '',
};

const useHouseStore = create<HouseStore>((set, get) => ({
  houses: [],
  filteredHouses: [],
  filters: initialFilters,
  currentHouse: null,
  loading: false,
  status: 'sale',
  error: null,

  fetchHouses: async () => {
    set({ loading: true, error: null });
    try {
      const fetched = await getAllProperties();
      // If needed, map API fields to match your local structure
      const houses = fetched;

      set({
        houses,
        loading: false
      });

      const currentFilters = get().filters
      get().updateFilters(currentFilters)

    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch houses',
        loading: false
      });
    }
  },
  searchPropertiesAPI: async () => {
    set({loading:true, error:null})
    try {
      const currentFilters = get().filters
      const apiFilters = {
        type: currentFilters.type !== 'all' ? currentFilters.type : undefined,
        minprice: currentFilters.minPrice,
        maxPrice: currentFilters.maxPrice,
        minBedrooms: currentFilters.bedrooms,
        minBathrooms: currentFilters.bathrooms,
        keyWord: currentFilters.searchQuery ?? currentFilters.locationQuery
      }

      const results = await searchProperties(apiFilters)

      set({
        houses:results,
        filteredHouses: results,
        loading:false
      })
    }catch(error) {
      let errorMessage = ' Failed to search properties'

      if(error instanceof Error) {
        errorMessage = error.message
      }

      set({
        error: errorMessage,
        loading: false
      })
    }
  },

  fetchHouseById: async (id:string) => {
    set({ loading: true, error: null });
    try {
      const fetched = await getPropertyById(id);
      const house = fetched;
      
      if (!house) throw new Error('House not found');
      set({ currentHouse: house, loading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch house',
        loading: false
      });
    }
  },

  updateFilters: (filterUpdate: Partial<HouseFilters>) => {
    const currentState = get();
    console.log('before filtering', currentState.houses.length)
    console.log('current filters before update', currentState.filters)
    console.log('filter update:', filterUpdate)

    const newFilters = { ...currentState.filters, ...filterUpdate };
    
    let filtered = currentState.houses;

    console.log('Houses with status', currentState.houses.map(house => ({
      id: house.id,
      title:house.title,
      status:house.status
    })))

    // Apply numeric range filters
    if(newFilters.status) {
      console.log('filtered by status,', newFilters.status)
      filtered = filtered.filter(house => house.status === newFilters.status)
      console.log('filtered after status filter', filtered)
    }
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
        filtered = filtered.filter(house => Number(house.surface) >= minAreaNum);
      }
    }
    if (newFilters.maxArea !== undefined && newFilters.maxArea !== '') {
      const maxAreaNum = Number(newFilters.maxArea);
      if (!isNaN(maxAreaNum)) {
        filtered = filtered.filter(house => Number(house.surface) <= maxAreaNum);
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
        if(newFilters.type === 'all') return true;
        if(house.type === newFilters.type) return true;
      });
    }

    // Apply city filter
    if (newFilters.city) {
      filtered = filtered.filter(house => 
        house.address.toLowerCase().includes(newFilters.city!.toLowerCase())
      );
    }

    // Apply amenities filter
  /*   if (newFilters.amenities && newFilters.amenities.length > 0) {
      console.log('newFilters.amenities', newFilters.amenities);
      filtered = filtered.filter(house => 
        
        newFilters.amenities!.some(amenity => 
        {
 

          return house.amenities.includes(amenity)
        }
        )
      );
    } */

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
        house.address.toLowerCase().includes(query) ||
        house.address.toLowerCase().includes(query) ||
        house.address.toLowerCase().includes(query)
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