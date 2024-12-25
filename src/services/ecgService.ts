import type { ECGRecord } from '../types/models';
import { uploadToCloudinary } from './cloudinaryService';

// export async function analyzeECG(imageFile: File): Promise<ECGRecord> {
//   // Upload to Cloudinary first
//   const originalImageUrl = await uploadToCloudinary(imageFile);

//   // Send to Flask API for analysis
//   const formData = new FormData();
//   formData.append('image', imageFile);

//   const response = await fetch('http://localhost:8000/api/predict', {
//     method: 'POST',
//     body: formData,
//   });

//   if (!response.ok) {
//     throw new Error('Failed to analyze ECG');
//   }

//   const data = await response.json();

//   // For now, using dummy processed image URL
//   const processedImageUrl = originalImageUrl;

//   return {
//     id: crypto.randomUUID(),
//     patientEmail: sessionStorage.getItem('userEmail') || '',
//     originalImageUrl,
//     processedImageUrl,
//     prediction: data.prediction || 'Normal ECG', // Dummy prediction
//     timestamp: new Date(),
//   };
// }
export async function analyzeECG(imageFile: File): Promise<ECGRecord> {
  // Upload to Cloudinary first (optional, but assume you upload to a cloud storage)
  const originalImageUrl = await uploadToCloudinary(imageFile);


  const formData = new FormData();
  formData.append('file', imageFile);  // Ensure 'file' matches Flask's key

  const response = await fetch('http://localhost:8000/api/predict', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to analyze ECG');
  }

  const data = await response.json();

  // Use the processed image URL or keep original
  const processedImageUrl = originalImageUrl;

  return {
    id: crypto.randomUUID(),
    patientEmail: sessionStorage.getItem('userEmail') || '',
    originalImageUrl: originalImageUrl,
    processedImageUrl,
    prediction: data.prediction || 'Unpredicted',
    timestamp: new Date(),
  };
}
