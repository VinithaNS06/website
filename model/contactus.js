const mongoose = require("mongoose");

const contactusSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  mobilenum: { type: Number },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const ContactUSList = mongoose.model("m8it_contactus", contactusSchema);
module.exports = ContactUSList;
