const express = require("express");
const router = express.Router();
const InvoiceData = require("../models/InvoiceData");
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

// Route to get invoice data
router.get("/", async (req, res) => {
  try {
    const invoices = await InvoiceData.find();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  const body = req.body;
  body.items = JSON.parse(body.items);
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

    const invoice = new InvoiceData({
      ...body,
      image: base64Image,
      mimetype: file ? file.mimetype : null, // Add mimetype only if file exists
    });

    const newInvoice = await invoice.save();
    res.status(201).json(newInvoice);
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

router.put("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params; // Get the invoice ID from the URL
  const body = req.body; // Updated data
  const file = req.file; // New profile image (if provided)

  try {
    // Find the invoice by ID
    const invoice = await InvoiceData.findById(id);
    if (!invoice) {
      return res.status(404).json({ message: "invoice not found" });
    }

    // Update the profile image if a new file is uploaded
    if (file) {
      const imageBuffer = fs.readFileSync(file.path);
      invoice.image = imageBuffer.toString("base64");
      invoice.mimetype = file.mimetype; // Update mimetype
      // Delete the temporary file
      fs.unlinkSync(file.path);
    } else if (body.image === "") {
      invoice.image = "";
    }

    // Update other fields
    invoice.invoiceId = body.invoiceId || invoice.invoiceId;
    invoice.date = body.date || invoice.date;
    invoice.name = body.name || invoice.name;
    invoice.email = body.email || invoice.email;
    invoice.address = body.address || invoice.address;
    invoice.country = body.country || invoice.country;
    invoice.city = body.city || invoice.city;
    invoice.postal = body.postal || invoice.postal;
    if (body.items) {
      try {
        invoice.items = JSON.parse(body.items);
      } catch (parseError) {
        console.error("Failed to parse items:", parseError);
        // Optionally, you can send an error response if parsing fails:
        return res.status(400).json({ message: "Invalid items format" });
      }
    } else {
      invoice.items = invoice.items;
    }

    // Save the updated invoice
    const updatedInvoice = await invoice.save();
    res.status(200).json(updatedInvoice);
    console.log(updatedInvoice);
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
    // First find the invoice to ensure they exist
    const invoice = await InvoiceData.findById(id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Delete the invoice
    await InvoiceData.findByIdAndDelete(id);

    // Successful deletion response
    res.status(200).json({ message: "invoice deleted successfully" });
  } catch (error) {
    // Handle invalid ID format
    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid invoice ID format" });
    }
    // Handle other errors
    else {
      res.status(500).json({ message: "Internal server error" });
    }
    console.error("Delete error:", error.message);
  }
});

module.exports = router;
