import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  weight: { type: Number },
  height: { type: Number },
  medical_history: { type: String },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Patient', patientSchema);