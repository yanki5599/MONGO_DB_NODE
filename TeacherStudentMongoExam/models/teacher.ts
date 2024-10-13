import mongoose, { Schema, Types } from "mongoose";
import { ICollageUser } from "./collageUser.js";
import validator from "validator";
import { IStudent } from "./student.js";
import Student from "./student.js";

export interface ITeacher extends ICollageUser, mongoose.Document {
  ClassRoom: Types.ObjectId;
  students: IStudent[];
}

const userSchema: mongoose.Schema<ITeacher> = new mongoose.Schema({
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
  ClassRoom: {
    type: Schema.Types.ObjectId,
    ref: "ClassRoom",
    required: true,
  },
  students: {
    type: [Student],
    default: [],
  },
});

export default mongoose.model<ITeacher>("Teacher", userSchema);
