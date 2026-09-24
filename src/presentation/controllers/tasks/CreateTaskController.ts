import { Request, Response } from "express";
import { CreateTaskUseCase } from "@/application/use-cases/tasks/CreateTaskUseCase";
import { createTaskSchema } from "@/presentation/schemas/tasks/createTaskSchema";

export class CreateTaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const data = createTaskSchema.parse(req.body);
    const task = await this.createTaskUseCase.execute(data);

    return res.status(201).json(task)
  }
}