import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import asyncHandler from "../middleware/asyncHandler";
import * as userService from "../services/userService";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json({ success: true, data: newUser });
});

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.status(200).json({ success: true, data: users });
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = userService.getUserByUsername(req.params.username);
  res.status(200).json({ success: true, data: user });
});

// Optionally, add DELETE and EDIT functions
