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
///--------------------------------------------------------------
// export const getAllUsers = async (): Promise<IStudent[]> => {
//   return await UserModel.find();
// };
// export const getUserByPassportId = async (
//   passportId: string
// ): Promise<IStudent> => {
//   if (!passportId) {
//     throw new ErrorWithStatusCode("passportId is required", 400);
//   }
//   const user = await UserModel.findOne({ passportId });
//   if (!user) {
//     throw new ErrorWithStatusCode("User not found", 404);
//   }
//   return user;
// };
// export const getAverageGrade = async (
//   wantedUser: IStudent
// ): Promise<number> => {
//   if (wantedUser.grades.length === 0) {
//     return 0;
//   }

//   //----------------------------------
//   const result = await UserModel.aggregate([
//     {
//       $match: { _id: wantedUser._id },
//     },
//     {
//       $project: {
//         _id: 0,
//         avgGrade: { $avg: "$grades.grade" },
//       },
//     },
//   ]);
//   console.log("result:", result);
//   //-----------------------------------------
//   return (
//     wantedUser.grades.reduce((a: number, b: IGrade) => a + b.grade, 0) /
//     wantedUser.grades.length
//   );
// };

// export const addGrade = async (
//   passportId: string,
//   newGrade: IGrade
// ): Promise<void> => {
//   console.log("passportId:", passportId);

//   if (!passportId) {
//     throw new ErrorWithStatusCode("passportId is required", 400);
//   }
//   if (!newGrade) {
//     throw new ErrorWithStatusCode("grade is required", 400);
//   }

//   const wantedUser: IStudent | null = await UserModel.findOne({
//     passportId: passportId,
//   });
//   if (!wantedUser) {
//     throw new Error("User not found");
//   }

//   wantedUser.grades.push(newGrade);
//   wantedUser.save();
// };
// export const removeGrade = async (
//   passportId: string,
//   gradeSubject: string
// ): Promise<void> => {
//   if (!passportId) {
//     throw new ErrorWithStatusCode("passportId is required", 400);
//   }
//   if (!gradeSubject) {
//     throw new ErrorWithStatusCode("gradeSubject is required", 400);
//   }
//   const wantedUser: IStudent = await getUserByPassportId(passportId);

//   wantedUser.grades = wantedUser.grades.filter(
//     (g) => g.subject !== gradeSubject
//   );
//   wantedUser.save();
// };

// export const updateGrade = async (
//   passportId: string,
//   newGrade: IGrade
// ): Promise<void> => {
//   if (!passportId) {
//     throw new ErrorWithStatusCode("passportId is required", 400);
//   }
//   const user = await getUserByPassportId(passportId);
//   user.grades = user.grades.filter((g) => g.subject !== newGrade.subject);
//   user.grades.push(newGrade);
//   user.save();
// };

// export const deleteUser = async (id: string) => {
//   if (!id) {
//     throw new ErrorWithStatusCode("id is required", 400);
//   }
//   const user = await UserModel.findByIdAndDelete(id);
//   if (!user) {
//     throw new ErrorWithStatusCode("User not found", 404);
//   }
// };
