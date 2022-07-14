const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recordSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Record", recordSchema);
