"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.authenticateUser = exports.createUser = void 0;
const errorTypes_js_1 = require("../models/errorTypes.js");
const collageUser_js_1 = __importDefault(require("../models/collageUser.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = 10;
const createUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (!newUser.email || !newUser.password) {
        throw new errorTypes_js_1.ErrorWithStatusCode("passportId and password are required", 400);
    }
    const user = yield collageUser_js_1.default.findOne({ email: newUser.email });
    if (user) {
        throw new errorTypes_js_1.ErrorWithStatusCode("User already exists", 409);
    }
    newUser.password = yield bcrypt_1.default.hash(newUser.password, SALT_ROUNDS);
    try {
        const added = yield collageUser_js_1.default.create(newUser);
        return added;
    }
    catch (error) {
        throw new errorTypes_js_1.ErrorWithStatusCode(error.message, 400);
    }
});
exports.createUser = createUser;
const authenticateUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password) {
        throw new errorTypes_js_1.ErrorWithStatusCode("email and password are required", 401);
    }
    const user = yield collageUser_js_1.default.findOne({ email });
    if (!user) {
        throw new errorTypes_js_1.ErrorWithStatusCode("User not found", 401);
    }
    if (!(yield bcrypt_1.default.compare(password, user.password))) {
        throw new errorTypes_js_1.ErrorWithStatusCode("invalid id or password", 401);
    }
    return user;
});
exports.authenticateUser = authenticateUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield collageUser_js_1.default.findById(id);
    if (!user) {
        throw new errorTypes_js_1.ErrorWithStatusCode("User not found", 404);
    }
    return user;
});
exports.getUserById = getUserById;
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
