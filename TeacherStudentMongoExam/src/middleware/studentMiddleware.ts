import { Request, Response, NextFunction } from "express";
import { Role } from "../models/role";
import * as studentService from "../services/studentService";
export const studentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((req as any).user.role !== Role.STUDENT) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
  (req as any).student = await studentService.getStudentByUserId(
    (req as any).user._id
  );
  next();
};
