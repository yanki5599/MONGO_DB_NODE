import mongoose, { Types } from "mongoose";
import { Role } from "./role.js";

export interface ICollageUser {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

const collageUserSchema: mongoose.Schema<ICollageUser> = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [30, "Name cannot be more than 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    default: Role.STUDENT,
  },
});
