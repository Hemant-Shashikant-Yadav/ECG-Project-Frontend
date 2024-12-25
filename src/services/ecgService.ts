import type { ECGRecord } from '../types/models';
import { uploadToCloudinary } from './cloudinaryService';

export async function analyzeECG(imageFile: File): Promise<ECGRecord> {
  // Upload to Cloudinary first
  const originalImageUrl = await uploadToCloudinary(imageFile);

  const formData = new FormData();
  formData.append('file', imageFile);  // Ensure 'file' matches Flask's key

  const response = await fetch('http://localhost:8000/api/predict', {
    // const response = await fetch('https://ecs-backend-e4ii.vercel.app/api/predict', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to analyze ECG');
  }

  const data = await response.json();

  return {
    id: crypto.randomUUID(),
    patientEmail: sessionStorage.getItem('userEmail') || '',
    originalImageUrl,
    prediction: data.prediction || 'Unpredicted',
    timestamp: new Date(),
  };
}