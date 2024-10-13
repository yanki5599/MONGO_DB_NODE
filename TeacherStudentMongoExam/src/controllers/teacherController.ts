import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { ITeacher } from "../models/teacher";
import * as teacherService from "../services/teacherService";
import * as classRoomService from "../services/classRoomService";
import { IClassRoom } from "../models/classRoom";
import student, { IGrade } from "../models/student";
import * as studentService from "../services/studentService";
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

export const getStudentGrades = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const grades: IGrade[] = await studentService.getGrades(req.params.id);
    res
      .status(200)
      .json({
        success: true,
        message: "Grades fetched successfully",
        data: grades,
      });
  }
);
export const addGradeForStudent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
export const updateGradeForStudent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
export const getAllStudents = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
export const getStudentsAvg = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
