import mongoose, { Schema, Types } from "mongoose";
import validator from "validator";
import { ICollageUser } from "./collageUser";

export interface IGrade {
  _id: Types.ObjectId;
  note: string;
  grade: number;
}

export interface IStudent extends ICollageUser {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  grades: IGrade[];
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

const studentSchema: mongoose.Schema<IStudent> = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "CollageUser",
    required: true,
  },
  grades: { type: [gradeSchema], default: [] },
});

export default mongoose.model<IStudent>("Student", studentSchema);
