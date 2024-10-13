import { ErrorWithStatusCode } from "../models/errorTypes";
import { IStudent } from "../models/student";
import studentModel from "../models/student";
import statusCode from "../models/errorStatusConstants";
import { ICollageUser } from "../models/collageUser";
import * as userService from "./userService";
import { Role } from "../models/role";
import classRoom from "../models/classRoom";
import * as classRoomService from "./classRoomService";

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
    await teacher.updateOne({
      $push: { students: added._id },
    });
    return await added.populate("userId");
  } catch (error: any) {
    throw new ErrorWithStatusCode(error.message, 400);
  }
};
