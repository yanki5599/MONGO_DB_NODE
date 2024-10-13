import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import * as userService from "../services/userService.js";

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  }
);

export const getUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.getUserByPassportId(req.params.id);
    res.status(200).json({ success: true, data: user });
  }
);
