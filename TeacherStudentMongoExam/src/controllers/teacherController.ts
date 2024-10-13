import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { ITeacher } from "../models/teacher";
import * as teacherService from "../services/teacherService";
import * as classRoomService from "../services/classRoomService";
import { IClassRoom } from "../models/classRoom";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newTeacher: ITeacher = req.body;
    const classRoom: IClassRoom = await teacherService.create(
      newTeacher,
      req.body.className
    );

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: { classId: classRoom.id },
    });
  }
);
