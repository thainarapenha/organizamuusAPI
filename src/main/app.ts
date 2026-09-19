import express from "express";

import { CreateTaskUseCase } from "@/application/use-cases/tasks/CreateTaskUseCase";
import { ListTasksUseCase } from "@/application/use-cases/tasks/ListTasksUseCase";

import { prisma } from "@/infrastructure/database/PrismaClient";
import { PrismaApartmentMemberRepository } from "@/infrastructure/database/PrismaApartmentMemberRepository";
import { PrismaTaskRepository } from "@/infrastructure/database/PrismaTaskRepository";

import { errorHandler } from "@/presentation/middlewares/errorHandler";
import { CreateTaskController } from "@/presentation/controllers/tasks/CreateTaskController";
import { ListTasksController } from "@/presentation/controllers/tasks/ListTasksController";
import { taskRoutes } from "@/presentation/routes/taskRoutes";

export const app = express();

app.use(express.json());

const taskRepository = new PrismaTaskRepository(prisma);

const apartmentMemberRepository = new PrismaApartmentMemberRepository(prisma);

const createTaskUseCase = new CreateTaskUseCase(taskRepository, apartmentMemberRepository);
const listTasksUseCase = new ListTasksUseCase(taskRepository);

const createTaskController = new CreateTaskController(createTaskUseCase);
const listTasksController = new ListTasksController(listTasksUseCase);

app.use(taskRoutes(createTaskController, listTasksController));
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    message: "Olá mundo!",
    status: "success"        
  });
});