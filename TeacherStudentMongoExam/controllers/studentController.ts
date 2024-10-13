import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { IStudent } from "../models/student.js";
import * as studentService from "../services/studentService.js";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newStudent: IStudent = req.body;
    const added = await studentService.create(newStudent);
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  }
);
