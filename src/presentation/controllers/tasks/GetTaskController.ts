import { Request, Response } from "express";

import { GetTaskUseCase } from "@/application/use-cases/tasks/GetTaskUseCase";

export class GetTaskController {
  constructor(
    private readonly getTaskUseCase: GetTaskUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const task = await this.getTaskUseCase.execute({
      userId: req.userId,
      taskId: req.params.id as string,
    });

    return res.status(200).json(task);
  }
}