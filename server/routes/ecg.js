import express from "express";
import ECGRecord from "../models/ECGRecord.js";

const router = express.Router();

// Create new ECG record
router.post("/", async (req, res) => {
  try {
    const record = new ECGRecord({
      ...req.body,
      timestamp: new Date(),
    });
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Failed to create ECG record",
    });
  }
});

// Get all ECG records (with pagination and sorting)
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      ECGRecord.find().sort({ timestamp: -1 }).skip(skip).limit(limit),
      ECGRecord.countDocuments(),
    ]);

    res.json({
      records,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Failed to fetch ECG records",
    });
  }
});

// Get ECG records for a specific patient
router.get("/patient/:email", async (req, res) => {
  try {
    const records = await ECGRecord.find({
      patientEmail: req.params.email,
    }).sort({ timestamp: -1 });

    res.json(records);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Failed to fetch patient ECG records",
    });
  }
});

// Get a single ECG record by ID
router.get("/:id", async (req, res) => {
  try {
    const record = await ECGRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({
        message: "ECG record not found",
      });
    }
    res.json(record);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Failed to fetch ECG record",
    });
  }
});

export default router;
