const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"] },
    age: { type: Number, min: 0 },
    profileImage: { type: String },
    address: String,
    occupation: String,
    mimetype: String,
  },
  { collection: "customerData" }
);

module.exports = mongoose.model("CustomerData", customerSchema);
