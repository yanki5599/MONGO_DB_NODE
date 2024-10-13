import ClassRoomModel from "../models/classRoom";
import { ITeacher } from "../models/teacher";
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
  return await classRoom.populate("teacherId");
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
