import express from 'express';
import Patient from '../models/Patient.js';

const router = express.Router();

router.get('/:email', async (req, res) => {
  try {
    const patient = await Patient.findOne({ email: req.params.email });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:email', async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;