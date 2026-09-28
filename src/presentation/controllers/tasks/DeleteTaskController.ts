import { Request, Response } from "express";

import { DeleteTaskUseCase } from "@/application/use-cases/tasks/DeleteTaskUseCase";

export class DeleteTaskController {
  constructor(
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    await this.deleteTaskUseCase.execute({
      userId: req.userId,
      taskId: req.params.id as string,
    });

    return res.status(204).send();
  }
}