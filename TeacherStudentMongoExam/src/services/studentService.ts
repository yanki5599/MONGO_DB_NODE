import { ErrorWithStatusCode } from "../models/errorTypes";
import student, { IGrade, IStudent } from "../models/student";
import studentModel from "../models/student";
import statusCode from "../models/errorStatusConstants";
import { ICollageUser } from "../models/collageUser";
import * as userService from "./userService";
import { Role } from "../models/role";
import classRoom from "../models/classRoom";
import * as classRoomService from "./classRoomService";
import { stat } from "fs";
import { Types } from "mongoose";

export const create = async (
  newStudent: IStudent,
  className: string
): Promise<IStudent> => {
  if (!className)
    throw new ErrorWithStatusCode("ClassName missing.", statusCode.BAD_REQUEST);
  const teacher = await classRoomService.getClassRoomTeacher(className);
  if (!teacher) throw new ErrorWithStatusCode("Classroom not found.", 404);

  newStudent.role = Role.STUDENT;
  const addedUser: ICollageUser = await userService.createUser(newStudent);
  try {
    newStudent.userId = addedUser._id;
    const added = await studentModel.create(newStudent);
    // add student id to teachers students array
    teacher.students?.push(added._id);
    await teacher.save();
    return await added.populate("userId");
  } catch (error: any) {
    throw new ErrorWithStatusCode(error.message, 400);
  }
};

export const getStudentById = async (
  studentId: Types.ObjectId | string
): Promise<IStudent> => {
  console.log("studentId", studentId);

  const student = await studentModel.findById(studentId).populate("userId");
  if (!student) throw new ErrorWithStatusCode("Student not found.", 404);
  return student;
};

export const getGrades = async (studentId: string): Promise<IGrade[]> => {
  const student = await studentModel.findById(studentId);
  if (!student) throw new ErrorWithStatusCode("Student not found.", 404);
  return student.grades;
};

export const addGradeForStudent = async (
  studentId: string,
  grade: IGrade
): Promise<IGrade> => {
  try {
    const updatedStudent = await studentModel.findByIdAndUpdate(
      studentId,
      {
        $push: {
          grades: grade,
        },
      },
      { new: true }
    );

    if (!updatedStudent) {
      throw new ErrorWithStatusCode("Student not found.", statusCode.NOT_FOUND);
    }
    return updatedStudent.grades[updatedStudent.grades.length - 1];
  } catch (err: any) {
    throw new ErrorWithStatusCode(err.message, statusCode.BAD_REQUEST);
  }
};

export const updateGrade = async (
  studentId: string,
  grade: IGrade
): Promise<IGrade> => {
  try {
    const student = await getStudentById(studentId);
    const idx = student.grades.findIndex(
      (x) => x._id.toString() === grade._id.toString()
    );
    if (idx === -1) {
      throw new ErrorWithStatusCode("Grade not found.", statusCode.NOT_FOUND);
    }
    student.grades[idx] = grade;
    await student.save();
    return student.grades[idx];
  } catch (err: any) {
    throw new ErrorWithStatusCode(err.message, statusCode.BAD_REQUEST);
  }
};
export async function getStudentByUserId(
  id: Types.ObjectId | string
): Promise<IStudent> {
  const student = await studentModel.findOne({ userId: id });
  if (!student) throw new ErrorWithStatusCode("Student not found.", 404);
  return student;
}
