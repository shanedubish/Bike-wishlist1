const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: String,
  description: String,
  manufacture: String,
  comment: String,
  price: Number,
});

const Bike = mongoose.model("Bike", bikeSchema);

module.exports = Bike;
