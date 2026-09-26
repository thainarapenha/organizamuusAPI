import express from "express";

import { LoginUseCase } from "@/application/use-cases/auth/LoginUseCase";
import { CreateTaskUseCase } from "@/application/use-cases/tasks/CreateTaskUseCase";
import { ListTasksUseCase } from "@/application/use-cases/tasks/ListTasksUseCase";

import { BcryptPasswordService } from "@/infrastructure/services/BcryptPasswordService";
import { JwtTokenService } from "@/infrastructure/services/JwtTokenService";

import { prisma } from "@/infrastructure/database/PrismaClient";
import { PrismaApartmentMemberRepository } from "@/infrastructure/database/PrismaApartmentMemberRepository";
import { PrismaTaskRepository } from "@/infrastructure/database/PrismaTaskRepository";
import { PrismaUserRepository } from "@/infrastructure/database/PrismaUserRepository";

import { LoginController } from "@/presentation/controllers/auth/LoginController";
import { CreateTaskController } from "@/presentation/controllers/tasks/CreateTaskController";
import { ListTasksController } from "@/presentation/controllers/tasks/ListTasksController";

import { errorHandler } from "@/presentation/middlewares/errorHandler";

import { authRoutes } from "@/presentation/routes/authRoutes";
import { taskRoutes } from "@/presentation/routes/taskRoutes";

export const app = express();

app.use(express.json());

const taskRepository = new PrismaTaskRepository(prisma);
const apartmentMemberRepository = new PrismaApartmentMemberRepository(prisma);
const userRepository = new PrismaUserRepository(prisma);

const passwordService = new BcryptPasswordService();
const tokenService = new JwtTokenService();

const createTaskUseCase = new CreateTaskUseCase(taskRepository, apartmentMemberRepository);

const listTasksUseCase = new ListTasksUseCase(taskRepository);

const loginUseCase = new LoginUseCase(userRepository, passwordService, tokenService);

const createTaskController = new CreateTaskController(createTaskUseCase);

const listTasksController = new ListTasksController(listTasksUseCase);

const loginController = new LoginController(loginUseCase);

app.use(authRoutes(loginController));

app.use(taskRoutes(
  createTaskController,
  listTasksController,
));

app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    message: "Olá mundo!",
    status: "success",
  });
});