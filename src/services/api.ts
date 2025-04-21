// src/services/api.ts
import { getAuth, User } from 'firebase/auth';

const API_BASE_URL = 'https://simple-api-xi-beige.vercel.app';

interface ApiOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface ApiError {
  message?: string;
  error?: string;
  statusCode?: number;
}

export async function fetchWithAuth<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  const token = await user.getIdToken();
  
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
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, mergedOptions);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({} as ApiError));
    throw new Error(errorData.message || errorData.error || `API request failed with status ${response.status}`);
  }
  
  return response.json() as Promise<T>;
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
 