const mongoose = require("mongoose");

const CustomReqSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  mobilenum: { type: Number },
  message: { type: String, required: true, trim: true },
  image: { type: String, trim: true },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "m8it_categories",
  },
  status: { type: String, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const CustomReqList = mongoose.model("m8it_customrequest", CustomReqSchema);
module.exports = CustomReqList;
