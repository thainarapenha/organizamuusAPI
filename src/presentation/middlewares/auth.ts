import { Request, Response, NextFunction } from "express";

import { TokenService } from "@/application/services/TokenService";
import { AppError } from "@/application/errors/AppError";

export function authMiddleware(
  tokenService: TokenService,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return next(new AppError("Authentication token is required.", 401));
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
      return next(new AppError("Invalid authentication token.", 401));
    }

    try {
      const payload = tokenService.verify(token);

      req.userId = payload.userId;

      next();
    } catch {
      next(new AppError("Invalid authentication token.", 401));
    }
  };
}