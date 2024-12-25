import mongoose from 'mongoose';

const ecgRecordSchema = new mongoose.Schema({
  patientEmail: { type: String, required: true },
  originalImageUrl: { type: String, required: true },
  prediction: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

ecgRecordSchema.index({ patientEmail: 1 });

export default mongoose.model('ECGRecord', ecgRecordSchema);