const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
const customer = require("./routes/customer");
const invoice = require("./routes/invoice");
const InvoiceData = require("./models/InvoiceData");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/base")
  .then(() => console.log("Connected to MongoDB...."))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/customer", customer);
app.use("/invoice", invoice);

// async function addInvoice() {
//   const invoice = new InvoiceData({
//     invoiceId: "495702",
//     date: new Date("2023-12-20"),
//     name: "Laura Palmer",
//     email: "laura.palmer@example.com",
//     image: "",
//     address: "654 Twin Peaks, Washington",
//     items: [
//       { name: "Painting Set", price: 110, quantity: 2 },
//       { name: "Easel", price: 130, quantity: 1 },
//       { name: "Canvas Pack", price: 90, quantity: 3 },
//       { name: "Brush Set", price: 60, quantity: 1 },
//     ],
//   });

//   try {
//     const newInvoice = await invoice.save();
//     console.log(newInvoice);
//   } catch (error) {
//     if (error.name === "ValidationError") {
//       console.log({ message: "Validation failed", details: error.errors });
//     } else if (error.code === 11000) {
//       // Duplicate key error
//       console.log({ message: "Email already exists" });
//     } else {
//       console.log({ message: "Internal server error" });
//     }
//   }
// }

// addInvoice()

const port = process.env.PORT || 3300;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
