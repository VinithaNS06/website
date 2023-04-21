const mongoose = require("mongoose");

const tryonSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  video: { type: String },
  buttonname: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const TryonList = mongoose.model("m8it_tryonlists", tryonSchema);
module.exports = TryonList;
