import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import * as userService from "../services/userService";
import { Role } from "../models/role";
import { Types } from "mongoose";
import { ICollageUser } from "../models/collageUser";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token; // Extract token from cookies
  if (!token) {
    res.status(401).send({ message: "Unauthorized, missing token" });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  const id = (decoded as { role: Role; _id: string })._id;

  if (!id) {
    res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const user: ICollageUser = await userService.getUserById(id);
    (req as any).user = user;
  } catch (err) {
    console.log(err);
    res.status(401).send({ success: false, message: "Unauthorized" });
  }

  next();
};
