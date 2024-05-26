import mongoose, { Schema } from "mongoose";

const adminUserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 8 },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const AdminUserModel =
  mongoose.models.admins || mongoose.model("admins", adminUserSchema);
