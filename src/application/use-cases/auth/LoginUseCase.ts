import { AppError } from "@/application/errors/AppError";
import { PasswordService } from "@/application/services/PasswordService";
import { TokenService } from "@/application/services/TokenService";
import { UserRepository } from "@/domain/repositories/UserRepository";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async execute({ email, password }: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user || !user.passwordHash) {
      throw new AppError("Invalid email or password.", 401);
    }

    const passwordMatches = await this.passwordService.compare(
      password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new AppError("Invalid email or password.", 401);
    }

    const token = this.tokenService.generate({
      userId: user.id,
    });

    return {
      token,
    };
  }
}