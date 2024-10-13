import { ICollageUser } from "../models/collageUser";
import { ErrorWithStatusCode } from "../models/errorTypes";
import UserModel from "../models/collageUser";
import bcrypt from "bcrypt";
import { Types } from "mongoose";

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

export const createUser = async (
  newUser: ICollageUser
): Promise<ICollageUser> => {
  if (!newUser.email || !newUser.password) {
    throw new ErrorWithStatusCode("passportId and password are required", 400);
  }

  const user = await UserModel.findOne({ email: newUser.email });
  if (user) {
    throw new ErrorWithStatusCode("User already exists", 409);
  }
  newUser.password = await bcrypt.hash(
    newUser.password.toString(),
    SALT_ROUNDS
  );
  try {
    const added: ICollageUser = await UserModel.create(newUser);
    return added;
  } catch (error: any) {
    throw new ErrorWithStatusCode(error.message, 400);
  }
};
export const authenticateUser = async (
  email: string,
  password: string
): Promise<ICollageUser> => {
  if (!email || !password) {
    throw new ErrorWithStatusCode("email and password are required", 401);
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ErrorWithStatusCode("User not found", 401);
  }

  if (!(await bcrypt.compare(password.toString(), user.password))) {
    throw new ErrorWithStatusCode("invalid id or password", 401);
  }

  return user;
};

export const getUserById = async (id: string): Promise<ICollageUser> => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new ErrorWithStatusCode("User not found", 404);
  }
  return user;
};
