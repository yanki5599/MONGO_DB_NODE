import { Role } from "./role.js";
import mongoose, { Schema, Types } from "mongoose";
import validator from "validator";

export interface IGrade {
  note: string;
  grade: number;
}

export interface IStudent extends mongoose.Document {
  fullName: string;
  email: string;
  password: string;
  grades: IGrade[];
  role: Role;
  class: Types.ObjectId;
}

const gradeSchema: mongoose.Schema<IGrade> = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
    min: [0, "Grade cannot be less than 0"],
    max: [100, "Grade cannot be more than 100"],
  },
});

const userSchema: mongoose.Schema<IStudent> = new mongoose.Schema({
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
  grades: { type: [gradeSchema], default: [] },
  role: {
    type: String,
    required: true,
    trim: true,
    default: Role.STUDENT,
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
});

export default mongoose.model<IStudent>("Student", userSchema);

//export const GradeModel = mongoose.model<IGrade>("Grade", gradeSchema);
