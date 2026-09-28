import { Request, Response } from "express";

import { LoginUseCase } from "@/application/use-cases/auth/LoginUseCase";
import { loginSchema } from "@/presentation/schemas/auth/loginSchema";

export class LoginController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = loginSchema.parse(req.body);

    const result = await this.loginUseCase.execute({
      email,
      password,
    });

    return res.status(200).json(result);
  }
}