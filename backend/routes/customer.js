const express = require("express");
const router = express.Router();
const CustomerData = require("../models/CustomerData");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

router.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Route to get customer data
router.get("/", async (req, res) => {
  try {
    const customers = await CustomerData.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add new customer data
router.post("/", upload.single("profileImage"), async (req, res) => {
  const body = req.body;
  const file = req.file;

  console.log("Request Body:", body);
  console.log("Uploaded File:", file);

  try {
    let base64Image = null;
    if (file) {
      const imageBuffer = fs.readFileSync(file.path);
      base64Image = imageBuffer.toString("base64");
      // Delete the temporary file
      fs.unlinkSync(file.path);
    }

    const customer = new CustomerData({ ...body, profileImage: base64Image });

    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Validation failed", details: error.errors });
    } else if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Internal server error" });
      console.log(error.message);
    }
  }
});

module.exports = router;