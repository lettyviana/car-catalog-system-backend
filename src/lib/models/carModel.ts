import mongoose, { Schema } from "mongoose";

const carSchema = new Schema(
  {
    name: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    photo: { type: String, required: true },
    price: { type: Number, required: true },
    miniCardPhoto: {type: String},
    year: { type: Number },
    version: { type: String },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "admins" },
  },
  { timestamps: true }
);

export const CarModel =
  mongoose.models.cars || mongoose.model("cars", carSchema);
