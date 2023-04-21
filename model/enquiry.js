const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  mobilenum: { type: Number },
  enqcategory: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "m8it_enqcategories",
  },
  createdAt: { type: Date, default: Date.now },
});

const EnquiryList = mongoose.model("m8it_enquires", enquirySchema);
module.exports = EnquiryList;
