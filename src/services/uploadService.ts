// src/services/uploadService.ts
import axios from 'axios';
import { fetchWithAuth } from './api'; // Import your existing API utility

// Types for Cloudinary responses
interface CloudinarySignature {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  uploadPreset: string;
}

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  resource_type: string;
  created_at: string;
  bytes: number;
  type: string;
  etag: string;
  url: string;
  original_filename: string;
}

export async function getCloudinarySignature(): Promise<CloudinarySignature> {
  return fetchWithAuth<CloudinarySignature>('/api/cloudinary/signature');
}

export async function uploadImageToCloudinary(file: File): Promise<string> {
  try {
    // First, get a signature from our backend
    const { signature, timestamp, apiKey, cloudName, uploadPreset } = 
      await getCloudinarySignature();
    
    // Create form data for upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);
    formData.append('upload_preset', uploadPreset);
    
    // Upload to Cloudinary with the signature
    const response = await axios.post<CloudinaryUploadResponse>(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}