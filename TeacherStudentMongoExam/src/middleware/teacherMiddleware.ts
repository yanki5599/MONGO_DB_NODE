import { Request, Response, NextFunction } from "express";
import { Role } from "../models/role";
import * as teacherService from "../services/teacherService";
export const teacherMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((req as any).user.role !== Role.TEACHER) {
    return res.status(403).json({ message: "Forbidden" });
  }
  (req as any).teacher = await teacherService.getTeacherByUserId(
    (req as any).user._id
  );
  next();
};
