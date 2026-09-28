import bcrypt from "bcrypt";

import { PasswordService } from "@/application/services/PasswordService";

export class BcryptPasswordService implements PasswordService {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}