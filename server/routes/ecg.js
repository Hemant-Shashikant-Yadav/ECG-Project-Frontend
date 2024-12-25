import express from 'express';
import ECGRecord from '../models/ECGRecord.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const record = new ECGRecord(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/patient/:email', async (req, res) => {
  try {
    const records = await ECGRecord.find({ patientEmail: req.params.email })
      .sort({ timestamp: -1 });
    res.json(records);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;