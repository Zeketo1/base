const express = require("express");
const router = express.Router();
const CustomerData = require("../models/CustomerData");

router.use(express.json());

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
router.post("/", async (req, res) => {
  const body = req.body;

  console.log(body);

  try {
    const customer = new CustomerData(body);

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
      console.log(error.message)
    }
  }
});

module.exports = router;
