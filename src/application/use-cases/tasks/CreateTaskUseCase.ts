import { AppError } from "@/application/errors/AppError";
import { Task, TaskRecurrence, TaskRoom } from "@/domain/entities/Task";
import { ApartmentMemberRepository } from "@/domain/repositories/ApartmentMemberRepository";
import { TaskRepository } from "@/domain/repositories/TaskRepository";

interface CreateTaskRequest {
  apartmentId: string;
  responsibleMemberId: string;
  createdByMemberId: string;

  room: TaskRoom;
  description: string;

  startDate: Date;
  endDate: Date;

  recurrence: TaskRecurrence;
}

interface CreateTaskResponse {
  task: Task;
}

export class CreateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly apartmentMemberRepository: ApartmentMemberRepository,
  ) {}

  async execute(request: CreateTaskRequest): Promise<CreateTaskResponse> {
    const {
      apartmentId,
      responsibleMemberId,
      createdByMemberId,
      room,
      description,
      startDate,
      endDate,
      recurrence,
    } = request;

    if (!apartmentId) {
      throw new AppError("Apartment is required.", 400);
    }

    if (!responsibleMemberId) {
      throw new AppError("Responsible member is required.", 400);
    }

    if (!createdByMemberId) {
      throw new AppError("Creator member is required.", 400);
    }

    if (!description.trim()) {
      throw new AppError("Task description is required.", 400);
    }

    if (startDate > endDate) {
      throw new AppError(
        "Start date cannot be greater than end date.",
        400,
      );
    }

    const responsibleMember = await this.apartmentMemberRepository.findById(responsibleMemberId)
      
    if (!responsibleMember) {
      throw new AppError("Responsible member not found.", 404);
    }

    if (responsibleMember.apartmentId !== apartmentId) {
      throw new AppError(
        "Responsible member does not belong to the apartment.",
        400,
      );
    }

    const createdByMember =
      await this.apartmentMemberRepository.findById(
        createdByMemberId,
      );

    if (!createdByMember) {
      throw new AppError("Creator member not found.", 404);
    }

    if (createdByMember.apartmentId !== apartmentId) {
      throw new AppError(
        "Creator member does not belong to the apartment.",
        400,
      );
    }

    const task = new Task({
      id: crypto.randomUUID(),

      apartmentId,
      responsibleMemberId,
      createdByMemberId,

      room,
      description,

      startDate,
      endDate,

      recurrence,
      status: "pending",

      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.taskRepository.create(task);

    return {
      task,
    };
  }
}