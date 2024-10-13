import { Request, Response, NextFunction } from "express";
import { Role } from "../models/role.js";
export const studentMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((req as any).user.role !== Role.STUDENT) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
