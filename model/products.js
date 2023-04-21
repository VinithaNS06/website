const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "m8it_categories",
  },
  skuid: { type: String, required: false, trim: true, default: 0 },
  title: { type: String, required: true, trim: true },
  product: { type: String, required: true, trim: true },
  remark: { type: String, required: true, trim: true },
  carrot: { type: Number, required: true, trim: true },
  wastage: { type: Number, required: true, trim: true },
  making: { type: Number, required: true, trim: true },
  grams: { type: Number, required: true, trim: true, default: 0 },
  price: { type: Number, required: true, trim: true },
  minprice: { type: Number },
  maxprice: { type: Number },
  image: { type: String, required: true, trim: true },
  productType: { type: String },
  purity: { type: Number },
  weightRange: { type: Number },
  occasion: { type: String },
  gender: { type: String },
  status: { type: String, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("m8it_products", ProductSchema);
module.exports = Product;
