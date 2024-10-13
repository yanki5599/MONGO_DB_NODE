import { ErrorWithStatusCode } from "../models/errorTypes";
import { ITeacher } from "../models/teacher";
import * as userService from "./userService";
import teacherModel from "../models/teacher";
import { Role } from "../models/role";
import classRoomModel, { IClassRoom } from "../models/classRoom";
import * as classRoomService from "./classRoomService";
import statusCode from "../models/errorStatusConstants";

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
