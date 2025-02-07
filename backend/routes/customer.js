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

    const customer = new CustomerData({
      ...body,
      profileImage: base64Image,
      mimetype: file ? file.mimetype : null, // Add mimetype only if file exists
    });

    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Validation failed", details: error.errors });
      console.log(error.message);
    } else if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: "Email already exists" });
      console.log(error.message);
    } else {
      res.status(500).json({ message: "Internal server error" });
      console.log(error.message);
    }
  }
});

// Route to update customer data
router.put("/:id", upload.single("profileImage"), async (req, res) => {
  const { id } = req.params; // Get the customer ID from the URL
  const body = req.body; // Updated data
  const file = req.file; // New profile image (if provided)

  try {
    // Find the customer by ID
    const customer = await CustomerData.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Update the profile image if a new file is uploaded
    if (file) {
      const imageBuffer = fs.readFileSync(file.path);
      customer.profileImage = imageBuffer.toString("base64");
      customer.mimetype = file.mimetype; // Update mimetype
      // Delete the temporary file
      fs.unlinkSync(file.path);
    } else if (body.profileImage === "") {
      customer.profileImage = "";
    }

    // Update other fields
    customer.name = body.name || customer.name;
    customer.email = body.email || customer.email;
    customer.occupation = body.occupation || customer.occupation;
    customer.phone = body.phone || customer.phone;
    customer.age = body.age || customer.age;
    customer.address = body.address || customer.address;
    customer.gender = body.gender || customer.gender;

    // Save the updated customer
    const updatedCustomer = await customer.save();
    res.status(200).json(updatedCustomer);
    console.log(updatedCustomer);
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Validation failed", details: error.errors });
    } else if (error.code === 11000) {
      // Duplicate key error (e.g., email already exists)
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
    console.log(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // First find the customer to ensure they exist
    const customer = await CustomerData.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Delete the customer
    await CustomerData.findByIdAndDelete(id);

    // Successful deletion response
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    // Handle invalid ID format
    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid customer ID format" });
    }
    // Handle other errors
    else {
      res.status(500).json({ message: "Internal server error" });
    }
    console.error("Delete error:", error.message);
  }
});

module.exports = router;
