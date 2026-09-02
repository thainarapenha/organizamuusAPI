import { Task, TaskRecurrence, TaskRoom } from "@/domain/entities/Task";
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
    private readonly taskRepository: TaskRepository
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
      throw new Error("Apartment is required.");
    }

    if (!responsibleMemberId) {
      throw new Error("Responsible member is required.");
    }

    if (!createdByMemberId) {
      throw new Error("Creator member is required.");
    }

    if (!description.trim()) {
      throw new Error("Task description is required.");
    }

    if (startDate > endDate) {
      throw new Error(
        "Start date cannot be greater than end date."
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