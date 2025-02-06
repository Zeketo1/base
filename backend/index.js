const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
const customer = require("./routes/customer");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/base")
  .then(() => console.log("Connected to MongoDB...."))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/customer", customer);

// async function addCustomer() {
//   const customer = new CustomerData(
//     {
//       name: "Kevin White",
//       email: "kevinwhite@example.com",
//       phone: "+1-555-234-5679",
//       gender: "Male",
//       age: 42,
//       address: "909 Redwood St, Phoenix, AZ",
//       occupation: "Accountant",
//     }
// );

//   try {
//     const newCustomer = await customer.save();
//     console.log(newCustomer);
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

// addCustomer();

const port = process.env.PORT || 3300;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
