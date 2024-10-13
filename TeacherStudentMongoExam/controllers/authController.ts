import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { IStudent } from "../models/student.js";
import jwt from "jsonwebtoken";
import * as userService from "../services/userService.js";

import { ErrorWithStatusCode } from "../models/errorTypes.js";

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { passportId, password } = req.body;
    const user = await userService.authenticateUser(passportId, password);

    if (!user) {
      throw new ErrorWithStatusCode("User not found", 404);
    }
    const token = jwt.sign(
      { passportId: user.passportId },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.status(200).json({ message: "User logged in successfully" });
  }
);

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser: IStudent = req.body;
    const added = await userService.createUser(newUser);
    res.status(201).json({ message: "User created successfully" });
  }
);
