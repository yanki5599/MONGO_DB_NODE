import { ErrorWithStatusCode } from "../models/errorTypes.js";
import { IStudent } from "../models/student.js";
import studentModel from "../models/student.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS: number | string = process.env.SALT_ROUNDS || 10;

export const create = async (newStudent: IStudent): Promise<IStudent> => {
  if (!newStudent.email || !newStudent.password) {
    throw new ErrorWithStatusCode("email and password are required", 400);
  }

  const user = await studentModel.findOne({ passportId: newStudent.email });
  if (user) {
    throw new ErrorWithStatusCode("User already exists", 409);
  }
  newStudent.password = await bcrypt.hash(newStudent.password, SALT_ROUNDS);
  try {
    const added = await studentModel.create(newStudent);
    return added;
  } catch (error: any) {
    throw new ErrorWithStatusCode(error.message, 400);
  }
};
