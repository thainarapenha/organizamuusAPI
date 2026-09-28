import { AppError } from "@/application/errors/AppError";
import { ApartmentMemberRepository } from "@/domain/repositories/ApartmentMemberRepository";
import { TaskRepository } from "@/domain/repositories/TaskRepository";

interface DeleteTaskRequest {
  userId: string;
  taskId: string;
}

export class DeleteTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly apartmentMemberRepository: ApartmentMemberRepository,
  ) {}

  async execute({
    userId,
    taskId,
  }: DeleteTaskRequest): Promise<void> {
    if (!userId) {
      throw new AppError("User is required.", 401);
    }

    if (!taskId) {
      throw new AppError("Task is required.", 400);
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

    await this.taskRepository.delete(taskId);
  }
}