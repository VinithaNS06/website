const mongoose = require("mongoose");
const ScheduleSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, trim: true },
  mobilenum: { type: Number },
  message: { type: String, trim: true },
  date: { type: String, required: true, trim: true },
  time: { type: String, required: true, trim: true },
  status: { type: String, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const Schedule = mongoose.model("m8it_appointments", ScheduleSchema);
module.exports = Schedule;
