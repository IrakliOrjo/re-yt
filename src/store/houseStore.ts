import { create } from 'zustand'
import { House, HouseStore } from '../types/houses';
import { houses as initialHouses } from '../const/houses';

const useHouseStore = create<HouseStore>((set,get) => ({
  houses: initialHouses as House[], 
  filteredHouses: initialHouses as House[],
  titleQuery: '',
  locationQuery: '',
  realtyType: 'All',
  loading: false,
  error: null,

  // Actions

  applyAllFilters: () => {
    const { houses, titleQuery, locationQuery, realtyType } = get();
    
    return houses.filter(house => {
      // Type filter
      const matchesType = realtyType === 'All' || house.type.includes(realtyType);
      
      // Title filter
      const matchesTitle = !titleQuery || 
        house.title.toLowerCase().includes(titleQuery.toLowerCase());
      
      // Location filter
      const searchTerm = locationQuery.toLowerCase().trim();
      const matchesLocation = !locationQuery || 
        house.city.toLowerCase().includes(searchTerm) ||
        house.street.toLowerCase().includes(searchTerm) ||
        house.district.toLowerCase().includes(searchTerm);
      
      // Return true only if all active filters match
      return matchesType && matchesTitle && matchesLocation;
    });
  },

  setType: (type:string) => {
 
    if (type === 'All') {
      set(() => ({
          realtyType: type,
          filteredHouses: get().houses
      }));
      return;
  }

    const filteredResults = get().houses.filter((house) => 
       house.type.includes(type)
);


      set(() => ({
        realtyType: type,
        filteredHouses:filteredResults
      }))
    },
  setLocationQuery: (query: string) =>
      set(() => ({
        locationQuery: query,
      })),

  setTitleQuery: (query: string) =>
      set(() => ({
        titleQuery: query,
      })),
  
  
  setSearchTitle: (query: string) => {
      const filteredResults = get().houses.filter((house) => 
            house.title.toLowerCase().includes(query.toLowerCase())
      );

        set({
          filteredHouses: filteredResults,
          titleQuery: query  // Update titleQuery instead of searchQuery
        });
        
        return filteredResults;
    },

    setSearchLocation: (query: string) => {
        const searchTerm = query.toLowerCase().trim();
        
        const filteredResults = get().houses.filter((house) => 
            house.city.toLowerCase().includes(searchTerm) ||
            house.street.toLowerCase().includes(searchTerm) ||
            house.district.toLowerCase().includes(searchTerm)
        );

        set({
            filteredHouses: filteredResults,
            locationQuery: query  // Update locationQuery instead of searchQuery
        });

        return filteredResults;
    },
 
      
    
 
      clearFilters: () =>
        set((state) => ({
          filteredHouses: state.houses,
          searchQuery: '',
        })),
    
 
      setLoading: (loading) =>
        set(() => ({
          loading,
        })),
    
 
      setError: (error) =>
        set(() => ({
          error,
        })),
  }));
  
  export default useHouseStore