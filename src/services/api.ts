import { getAuth } from 'firebase/auth';

const API_BASE_URL = 'https://simple-api-xi-beige.vercel.app';

interface ApiOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface ApiError {
  message?: string;
  error?: string;
  statusCode?: number;
}

export async function fetchPublic<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  try {
    const defaultOptions: ApiOptions = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    const mergedOptions: ApiOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };
    
    console.log(`Fetching public data from: ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, mergedOptions);
    
    if (!response.ok) {
      console.error(`API error (${response.status}):`, response.statusText);
      
      // Try to get error details from response
      let errorData: ApiError = {};
      try {
        errorData = await response.json();
      } catch (e) {
        console.error('Failed to parse error response:', e);
      }
      
      throw new Error(errorData.message || errorData.error || `API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function fetchWithAuth<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  try {
    const auth = getAuth();
    
    // Check if we're still initializing auth
    if (!auth.currentUser) {
      console.log('No user found, waiting for auth state to settle...');
      
      // Give the auth state a moment to settle if the page just loaded
      // This is useful after a redirect
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    const user = auth.currentUser;
    
    console.log('Auth state during API call:', user ? `User: ${user.email}` : 'No user');
    
    if (!user) {
      console.error('API call attempted without authenticated user');
      throw new Error('User not authenticated');
    }
    
    try {
      const token = await user.getIdToken(true);
      
      const defaultOptions: ApiOptions = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      
      const mergedOptions: ApiOptions = {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options.headers
        }
      };
      
      console.log(`Fetching from: ${API_BASE_URL}${endpoint}`);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, mergedOptions);
      
      if (!response.ok) {
        console.error(`API error (${response.status}):`, response.statusText);
        
        // Try to get error details from response
        let errorData: ApiError = {};
        try {
          errorData = await response.json();
        } catch (e) {
          console.error('Failed to parse error response:', e);
        }
        
        throw new Error(errorData.message || errorData.error || `API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error('Token or fetch error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Fetch with auth error:', error);
    throw error;
  }
}

// Example API functions with type safety
interface ProtectedResponse {
  message: string;
  user?: {
    uid: string;
    email?: string;
    email_verified?: boolean;
  };
}

export async function getProtectedData(): Promise<ProtectedResponse> {
  return fetchWithAuth<ProtectedResponse>('/api/protected');
}

interface WhitelistCheckResponse {
  email: string;
  whitelisted: boolean;
}

export async function checkWhitelisted(email: string): Promise<WhitelistCheckResponse> {
  return fetchWithAuth<WhitelistCheckResponse>(`/api/whitelist/check/${encodeURIComponent(email)}`);
}

// Example function for adding a new whitelisted email (admin only)
interface AddWhitelistRequest {
  email: string;
  description?: string;
}

interface WhitelistResponse {
  id: number;
  email: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function addWhitelistedEmail(data: AddWhitelistRequest): Promise<WhitelistResponse> {
  return fetchWithAuth<WhitelistResponse>('/api/whitelist', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

// Function to get all whitelisted emails (admin only)
export async function getAllWhitelistedEmails(): Promise<WhitelistResponse[]> {
  return fetchWithAuth<WhitelistResponse[]>('/api/whitelist');
}

// Function to delete a whitelisted email (admin only)
export async function removeWhitelistedEmail(email: string): Promise<{ message: string; email: string }> {
  return fetchWithAuth<{ message: string; email: string }>(`/api/whitelist/${encodeURIComponent(email)}`, {
    method: 'DELETE'
  });
}

// Property Types
export interface PropertyImage {
  id?: number;
  url: string;
  is_main?: boolean;
  display_order?: number;
}

export interface Property {
  id?: string;
  title: string;
  type: string;
  status: string;
  description?: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  surface: number;
  price: number;
  featured?: boolean;
  floor?: number;
  total_floors?: number;
  repair?: string;
  balcony?: boolean;
  toilet_count?: number;
  heating_system?: string;
  parking?: boolean;
  furniture?: boolean;
  elevator?: boolean;
  main_image?: string; 
  images?: PropertyImage[];
  created_at?: string;
  updated_at?: string;
}

// Property API Functions

// Get all properties
export async function getAllProperties(): Promise<Property[]> {
  try {
    return await fetchPublic<Property[]>('/api/properties');
  } catch (error) {
    console.error('Error getting properties:', error);
    return []; // Return empty array on error to prevent UI errors
  }
}

// Get a single property by ID
export async function getPropertyById(id: string): Promise<Property> {
  return fetchPublic<Property>(`/api/properties/${id}`);
}

// Create a new property
export async function createProperty(property: Property): Promise<Property> {
  return fetchWithAuth<Property>('/api/properties', {
    method: 'POST',
    body: JSON.stringify(property)
  });
}

// Update an existing property
export async function updateProperty(id: number, property: Property): Promise<Property> {
  console.log('update property', property)
  return fetchWithAuth<Property>(`/api/properties/${id}`, {
    method: 'PUT',
    body: JSON.stringify(property)
  });
}

// Delete a property
export async function deleteProperty(id: number): Promise<{ message: string; id: number }> {
  return fetchWithAuth<{ message: string; id: number }>(`/api/properties/${id}`, {
    method: 'DELETE'
  });
}

// Set a specific image as the main image
export async function setMainImage(propertyId: number, imageId: number): Promise<{ message: string }> {
  return fetchWithAuth<{ message: string }>(`/api/properties/${propertyId}/images/${imageId}/set-main`, {
    method: 'PATCH'
  });
}

// Search properties with filters
export async function searchProperties(filters: Record<string, any>): Promise<Property[]> {
  // Convert filters to query parameters
  const queryParams = new URLSearchParams();
  
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value.toString());
    }
  }
  
  return fetchWithAuth<Property[]>(`/api/properties/search?${queryParams.toString()}`);
}