const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
const customer = require("./routes/customer");
const invoice = require("./routes/invoice");
const schedule = require("./routes/schedule");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/base")
  .then(() => console.log("Connected to MongoDB...."))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/customer", customer);
app.use("/invoice", invoice);
app.use("/schedule", schedule);

const port = process.env.PORT || 3300;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
