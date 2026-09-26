import { JwtPayload } from "@/application/services/JwtPayload";

declare global {
  namespace Express {
    interface Request {
      userId: JwtPayload["userId"];
    }
  }
}

export {};