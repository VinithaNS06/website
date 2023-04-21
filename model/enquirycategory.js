const mongoose = require("mongoose");
const enquiryCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  status: { type: String, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const EnqCategory = mongoose.model("m8it_enqcategories", enquiryCategorySchema);
module.exports = EnqCategory;
