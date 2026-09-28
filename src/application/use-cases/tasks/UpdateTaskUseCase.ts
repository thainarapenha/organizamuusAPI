import { AppError } from "@/application/errors/AppError";
import {
  Task,
  TaskRecurrence,
  TaskRoom,
  TaskStatus,
} from "@/domain/entities/Task";
import { ApartmentMemberRepository } from "@/domain/repositories/ApartmentMemberRepository";
import { TaskRepository } from "@/domain/repositories/TaskRepository";

interface UpdateTaskRequest {
  userId: string;
  taskId: string;

  responsibleMemberId: string;
  room: TaskRoom;
  description: string;
  startDate: Date;
  endDate: Date;
  recurrence: TaskRecurrence;
  status: TaskStatus;
}

export class UpdateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly apartmentMemberRepository: ApartmentMemberRepository,
  ) {}

  async execute({
    userId,
    taskId,
    responsibleMemberId,
    room,
    description,
    startDate,
    endDate,
    recurrence,
    status,
  }: UpdateTaskRequest) {
    if (!userId) {
      throw new AppError("User is required.", 401);
    }

    if (!taskId) {
      throw new AppError("Task is required.", 400);
    }

    if (!responsibleMemberId) {
      throw new AppError("Responsible member is required.", 400);
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

    const apartmentMember =
      await this.apartmentMemberRepository.findByUserId(userId);

    if (!apartmentMember) {
      throw new AppError(
        "User is not associated with an apartment.",
        403,
      );
    }

    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new AppError("Task not found.", 404);
    }

    if (task.apartmentId !== apartmentMember.apartmentId) {
      throw new AppError(
        "Task does not belong to the user's apartment.",
        403,
      );
    }

    const responsibleMember =
      await this.apartmentMemberRepository.findById(
        responsibleMemberId,
      );

    if (!responsibleMember) {
      throw new AppError("Responsible member not found.", 404);
    }

    if (
      responsibleMember.apartmentId !==
      apartmentMember.apartmentId
    ) {
      throw new AppError(
        "Responsible member does not belong to the apartment.",
        400,
      );
    }

    const updatedTask = new Task({
      id: task.id,

      apartmentId: task.apartmentId,
      responsibleMemberId,
      createdByMemberId: task.createdByMemberId,

      room,
      description,

      startDate,
      endDate,

      recurrence,
      status,

      createdAt: task.createdAt,
      updatedAt: new Date(),
    });

    return this.taskRepository.update(updatedTask);
  }
}