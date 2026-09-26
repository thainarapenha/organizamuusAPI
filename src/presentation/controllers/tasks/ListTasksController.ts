import { Request, Response } from "express";

import { ListTasksUseCase } from "@/application/use-cases/tasks/ListTasksUseCase";

export class ListTasksController {
  constructor(
    private readonly listTaksUseCase: ListTasksUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const tasks = await this.listTaksUseCase.execute(req.userId);

    return res.status(200).json(tasks);
  }
}