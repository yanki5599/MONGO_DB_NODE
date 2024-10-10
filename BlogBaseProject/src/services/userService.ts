import { ErrorWithStatusCode } from "../models/errorTypes";
import { IUser } from "../models/userModel";
import UserModel from "../models/userModel";
import statusCode from "../models/errorStatusConstants";

export const createUser = async (user: IUser): Promise<IUser> => {
  let exist = await UserModel.findOne({ username: user.username });
  if (exist)
    throw new ErrorWithStatusCode(
      "Username already taken",
      statusCode.CONFLICT
    );
  exist = await UserModel.findOne({ email: user.email });
  if (exist)
    throw new ErrorWithStatusCode("Email already taken", statusCode.CONFLICT);
  try {
    const added = await UserModel.create(user);
    return added;
  } catch (err: any) {
    throw new ErrorWithStatusCode(err.message, statusCode.BAD_REQUEST);
  }
};

export const getUsers = async (): Promise<IUser[]> => {
  const users: IUser[] = await UserModel.find();
  return users;
};

export const getUserByUsername = async (username: string): Promise<IUser> => {
  const user: IUser | null = await UserModel.findOne({ username });
  if (!user)
    throw new ErrorWithStatusCode("User not found", statusCode.NOT_FOUND);
  return user;
};
