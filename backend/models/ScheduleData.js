const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    title: { type: String },
    date: { type: Date, default: new Date() },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: String, default: "pending" },
  },
  { collection: "scheduleData" }
);

module.exports = mongoose.model("ScheduleData", scheduleSchema);
