import ClassRoomModel from "../models/classRoom";
import teacherModel, { ITeacher } from "../models/teacher";
import statusCode from "../models/errorStatusConstants";
import { ErrorWithStatusCode } from "../models/errorTypes";
import mongoose, { Types } from "mongoose";
export const getClassRoomTeacher = async (
  classRoomName: string
): Promise<ITeacher | undefined> => {
  const classRoom = await ClassRoomModel.findOne({ name: classRoomName });
  if (!classRoom) {
    return undefined;
  }
  const teacher = await teacherModel.findById(classRoom.teacherId);
  if (!teacher) {
    throw new ErrorWithStatusCode("Teacher not found", statusCode.NOT_FOUND);
  }
  return teacher;
};

export const getClassIdByName = async (
  classRoomName: string
): Promise<string> => {
  const classRoom = await ClassRoomModel.findOne({ name: classRoomName });
  if (!classRoom) {
    throw new ErrorWithStatusCode("Classroom not found", statusCode.NOT_FOUND);
  }
  return classRoom.id;
};
