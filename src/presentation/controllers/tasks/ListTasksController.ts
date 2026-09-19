import { Request, Response } from "express";
import { ListTasksUseCase } from "@/application/use-cases/tasks/ListTasksUseCase"
import { listTasksSchema } from "@/presentation/schemas/tasks/listTasksSchema";

export class ListTasksController {
  constructor(
    private readonly listTaksUseCase: ListTasksUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { apartmentId } = listTasksSchema.parse(req.query)

    const tasks = await this.listTaksUseCase.execute(apartmentId as string)

    return res.status(200).json(tasks)
  }
}