import { Request, Response } from "express";

import { UpdateTaskUseCase } from "@/application/use-cases/tasks/UpdateTaskUseCase";
import { updateTaskSchema } from "@/presentation/schemas/tasks/updateTaskSchema";

export class UpdateTaskController {
  constructor(
    private readonly updateTaskUseCase: UpdateTaskUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const data = updateTaskSchema.parse(req.body);

    const task = await this.updateTaskUseCase.execute({
      ...data,
      userId: req.userId,
      taskId: req.params.id as string,
    });

    return res.status(200).json(task);
  }
}