import mongoose from "mongoose";

export interface IClassRoom extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
}

const userSchema: mongoose.Schema<IClassRoom> = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [30, "Name cannot be more than 30 characters"],
    required: [true, "Please provide a class name"],
    unique: true,
  },
});

export default mongoose.model<IClassRoom>("ClassRoom", userSchema);
