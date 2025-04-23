const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    invoiceId: { type: String },
    date: { type: Date, default: new Date() },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    country: { type: String },
    postal: { type: String },
    status: { type: String, default: "pending" },
    city: { type: String },
    address: String,
    items: [
      {
        name: { type: String, required: true }, // Item name
        price: { type: Number, required: true }, // Item price
        quantity: { type: Number, required: true }, // Item quantity
      },
    ],
    mimetype: { type: String },
  },
  { collection: "invoiceData" }
);

module.exports = mongoose.model("InvoiceData", invoiceSchema);
