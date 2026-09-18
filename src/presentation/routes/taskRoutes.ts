import { Router } from "express";
import { CreateTaskController } from "@/presentation/controllers/tasks/CreateTaskController";

export function createTaskRoutes(
  createTaskController: CreateTaskController,
) {
  const router = Router();

  router.post("/tasks", (req, res) =>
    createTaskController.handle(req, res),
  );

  return router;
}