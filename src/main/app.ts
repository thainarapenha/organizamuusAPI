import { CreateTaskUseCase } from "@/application/use-cases/tasks/CreateTaskUseCase";
import { PrismaTaskRepository } from "@/infrastructure/database/PrismaTaskRepository";
import { PrismaApartmentMemberRepository } from "@/infrastructure/database/PrismaApartmentMemberRepository";
import { CreateTaskController } from "@/presentation/controllers/tasks/CreateTaskController";
import { createTaskRoutes } from "@/presentation/routes/taskRoutes";
import { prisma } from "@/infrastructure/database/PrismaClient";
import express from "express";
import { errorHandler } from "@/presentation/middlewares/errorHandler";

export const app = express();

app.use(express.json());

const taskRepository = new PrismaTaskRepository(prisma);

const apartmentMemberRepository = new PrismaApartmentMemberRepository(prisma);

const createTaskUseCase = new CreateTaskUseCase(taskRepository, apartmentMemberRepository);

const createTaskController = new CreateTaskController(createTaskUseCase);

app.use(createTaskRoutes(createTaskController));
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    message: "Olá mundo!",
    status: "success"        
  });
});