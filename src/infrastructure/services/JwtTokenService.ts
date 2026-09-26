import jwt from "jsonwebtoken";

import { TokenService } from "@/application/services/TokenService";

export class JwtTokenService implements TokenService {
  private readonly secret = process.env.JWT_SECRET;

  generate(payload: object): string {
    if (!this.secret) {
      throw new Error("JWT_SECRET is not configured.");
    }

    return jwt.sign(payload, this.secret);
  }

  verify<T>(token: string): T {
    if (!this.secret) {
      throw new Error("JWT_SECRET is not configured.");
    }

    return jwt.verify(token, this.secret) as T;
  }
}