import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { IStudent } from "../models/student";
import * as studentService from "../services/studentService";
import classRoom from "../models/classRoom";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newStudent: IStudent = req.body;
    const added = await studentService.create(newStudent, req.body.className);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: { username: added.fullName, userId: added.id },
    });
  }
);

export const getGrades = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const student = await studentService.getGrades((req as any).student.id);
    res.status(200).json({
      success: true,
      message: "Grades fetched successfully",
      data: student,
    });
  }
);
