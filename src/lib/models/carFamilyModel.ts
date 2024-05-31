import mongoose, { Schema } from "mongoose";

const carFamilySchema = new Schema(
  {
    make: { type: String, required: true, unique: true },
    model: { type: String, required: true, unique: true },
    photo: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const CarFamilyModel =
  mongoose.models.carFamilies || mongoose.model("carFamilies", carFamilySchema);
