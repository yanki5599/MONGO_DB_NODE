import { Request, Response, NextFunction } from "express";
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal Server Error" : err.message;
  if (statusCode === 500) {
    console.log(err);
  }
  res.status(statusCode).send({ success: false, message: message });
  return;
};
