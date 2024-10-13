import mongoose, { Schema, Types } from "mongoose";
import { ICollageUser } from "./collageUser";
import validator from "validator";
import { IStudent } from "./student";
import StudentModel from "./student";
import { types } from "util";

export interface ITeacher extends ICollageUser {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  students: mongoose.Types.ObjectId[];
}

const userSchema: mongoose.Schema<ITeacher> = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "CollageUser",
    required: true,
  },
  students: {
    type: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    default: [],
  },
});

export default mongoose.model<ITeacher>("Teacher", userSchema);
