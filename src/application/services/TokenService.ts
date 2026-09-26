import { JwtPayload } from "@/application/services/JwtPayload";

export interface TokenService {
  generate(payload: JwtPayload): string;

  verify(token: string): JwtPayload;
}