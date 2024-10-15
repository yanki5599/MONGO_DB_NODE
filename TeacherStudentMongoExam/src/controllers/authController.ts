import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler";
import jwt from "jsonwebtoken";
import * as userService from "../services/userService";

import { ErrorWithStatusCode } from "../models/errorTypes";
import { ICollageUser } from "../models/collageUser";

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user: ICollageUser = await userService.authenticateUser(
      email,
      password.toString()
    );

    if (!user) {
      throw new ErrorWithStatusCode("User not found", 404);
    }
    const token = jwt.sign(
      { role: user.role, id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.MODE_ENV === "production",
      maxAge: 3600000,
    });

    res
      .status(200)
      .json({ success: true, message: "User logged in successfully" });
  }
);
