const express = require("express");
const router = express.Router();
const ScheduleData = require("../models/ScheduleData");

// Route to get schedule data
router.get("/", async (req, res) => {
  try {
    const schedules = await ScheduleData.find();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const body = req.body;

  console.log("Request Body:", body);

  try {
    const schedule = new ScheduleData(body);

    const newSchedule = await schedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Validation failed", details: error.errors });
      console.log(error.message);
    } else {
      res.status(500).json({ message: "Internal server error" });
      console.log(error.message);
    }
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params; // Get the schedule ID from the URL
  const body = req.body; // Updated data

  try {
    // Find the schedule by ID
    const schedule = await ScheduleData.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: "schedule not found" });
    }

    // Update other fields
    schedule.title = body.title || schedule.title;
    schedule.date = body.date || schedule.date;
    schedule.name = body.name || schedule.name;
    schedule.email = body.email || schedule.email;
    schedule.status = body.status || schedule.status;

    // Save the updated schedule
    const updatedSchedule = await schedule.save();
    res.status(200).json(updatedSchedule);
    console.log(updatedSchedule);
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Validation failed", details: error.errors });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
    console.log(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // First find the schedule to ensure they exist
    const schedule = await ScheduleData.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: "schedule not found" });
    }

    // Delete the schedule
    await ScheduleData.findByIdAndDelete(id);

    // Successful deletion response
    res.status(200).json({ message: "schedule deleted successfully" });
  } catch (error) {
    // Handle invalid ID format
    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid schedule ID format" });
    }
    // Handle other errors
    else {
      res.status(500).json({ message: "Internal server error" });
    }
    console.error("Delete error:", error.message);
  }
});

module.exports = router;
