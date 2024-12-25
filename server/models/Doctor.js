import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  designation: { type: String, required: true },
  contact: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Doctor', doctorSchema);