const mongoose = require("mongoose");

const latestproductSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const LatestProduct = mongoose.model(
  "m8it_latestproductlists",
  latestproductSchema
);
module.exports = LatestProduct;
