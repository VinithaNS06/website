const mongoose = require("mongoose");

const shopbycategorySchema = new mongoose.Schema({
  image: { type: String },
  name: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const ShopCatList = mongoose.model("m8it_shopbycatlists", shopbycategorySchema);
module.exports = ShopCatList;
