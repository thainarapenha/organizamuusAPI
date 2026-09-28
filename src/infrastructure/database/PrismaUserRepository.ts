import { PrismaClient } from "@prisma/client";

import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
        googleId: user.googleId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  }

  async findByUserId(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return this.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return this.toDomain(user);
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        googleId,
      },
    });

    if (!user) {
      return null;
    }

    return this.toDomain(user);
  }

  private toDomain(user: {
    id: string;
    name: string;
    email: string;
    passwordHash: string | null;
    googleId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash ?? undefined,
      googleId: user.googleId ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}