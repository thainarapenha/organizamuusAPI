import { Request, Response } from "express";
import { CreateTaskUseCase } from "@/application/use-cases/tasks/CreateTaskUseCase";

export class CreateTaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const {
      apartmentId,
      responsibleMemberId,
      createdByMemberId,
      description,
      room,
      recurrence,
      startDate,
      endDate,
    } = req.body;

    const task = await this.createTaskUseCase.execute({
      apartmentId,
      responsibleMemberId,
      createdByMemberId,
      description,
      room,
      recurrence,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    return res.status(201).json(task);
  }
}