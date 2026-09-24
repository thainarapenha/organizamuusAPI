import { AppError } from "@/application/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Invalid request data.",
      errors: error.issues,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    message: "Internal server error.",
  });
}