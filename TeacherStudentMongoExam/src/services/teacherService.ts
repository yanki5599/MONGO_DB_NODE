import { ErrorWithStatusCode } from "../models/errorTypes";
import { ITeacher } from "../models/teacher";
import * as userService from "./userService";
import teacherModel from "../models/teacher";
import { Role } from "../models/role";
import classRoomModel, { IClassRoom } from "../models/classRoom";
import * as classRoomService from "./classRoomService";
import statusCode from "../models/errorStatusConstants";
import mongoose, { Types } from "mongoose";
import studentModel, { IStudent } from "../models/student";

export const create = async (
  newTeacher: ITeacher,
  className: string
): Promise<IClassRoom> => {
  newTeacher.role = Role.TEACHER;
  const addedUser = await userService.createUser(newTeacher);
  try {
    if (await classRoomService.getClassRoomTeacher(className)) {
      throw new ErrorWithStatusCode(
        "Classroom already exists",
        statusCode.CONFLICT
      );
    }
    // create teacher
    newTeacher.userId = addedUser._id;
    const added = await teacherModel.create(newTeacher);

    // create classroom
    const newClassRoom = await classRoomModel.create({
      name: className,
      teacherId: added._id,
    });

    return await newClassRoom;
  } catch (error: any) {
    throw new ErrorWithStatusCode(error.message, 400);
  }
};

export const addGradeForStudent = async (
  studentId: string,
  grade: number,
  node: string
): Promise<void> => {};

export const getTeacherById = async (
  teacherId: Types.ObjectId | string
): Promise<ITeacher> => {
  const teacher = await teacherModel.findById(teacherId).populate("userId");
  if (!teacher) {
    throw new ErrorWithStatusCode("Teacher not found", 404);
  }
  return teacher;
};

export const validateStudent = async (
  teacherId: Types.ObjectId | string,
  studentId: string
): Promise<boolean> => {
  const teacher = await getTeacherById(teacherId);
  console.log("studentId", studentId);
  console.log("students: ", teacher.students);

  if (!teacher.students.toString().includes(studentId.toString()))
    throw new ErrorWithStatusCode(
      "Student is not in your class",
      statusCode.FORBIDDEN
    );
  return true;
};

export const getStudents = async (teacherId: string): Promise<ITeacher> => {
  const teacher = await teacherModel.findById(teacherId).populate("students");
  if (!teacher)
    throw new ErrorWithStatusCode("Teacher not found", statusCode.NOT_FOUND);
  return teacher;
};

export const getStudentsAvg = async (
  teacherId: string
): Promise<IStudent[]> => {
  const teacher = await getTeacherById(teacherId);
  const result: IStudent[] = await studentModel.aggregate([
    {
      $match: { _id: { $in: teacher.students } },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $project: {
        avg: {
          $avg: "$grades.grade",
        },
      },
    },
  ]);
  return result;
};
export async function getTeacherByUserId(
  _id: Types.ObjectId | string
): Promise<ITeacher> {
  const teacher = await teacherModel.findOne({ userId: _id });
  if (!teacher) throw new ErrorWithStatusCode("Teacher not found.", 404);
  return teacher;
}
