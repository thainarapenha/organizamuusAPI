import { Router } from "express";
import { CreateTaskController } from "@/presentation/controllers/tasks/CreateTaskController";
import { ListTasksController } from "../controllers/tasks/ListTasksController";

export const taskRoutes = (
  createTaskController: CreateTaskController,
  listTasksController: ListTasksController,
) => {
  const router = Router();

  router.get("/tasks", async(req, res, next) => {
    try {
      await listTasksController.handle(req, res)
    } catch (error) {
      next(error)
    }
  })

  router.post("/tasks", async(req, res, next) => {
    try {
      await createTaskController.handle(req, res)
    } catch (error) {
      next(error)
    }
  })

  return router;
}