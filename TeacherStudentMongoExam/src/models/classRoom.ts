import mongoose, { Schema, Types } from "mongoose";

export interface IClassRoom extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  teacherId: mongoose.Types.ObjectId;
}

const userSchema: mongoose.Schema<IClassRoom> = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [30, "Name cannot be more than 30 characters"],
    required: [true, "Please provide a class name"],
    unique: true,
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
});

export default mongoose.model<IClassRoom>("ClassRoom", userSchema);
