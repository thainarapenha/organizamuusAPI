import { AppError } from "@/application/errors/AppError";
import { ApartmentMemberRepository } from "@/domain/repositories/ApartmentMemberRepository";
import { TaskRepository } from "@/domain/repositories/TaskRepository";

interface GetTaskRequest {
  userId: string;
  taskId: string;
}

export class GetTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly apartmentMemberRepository: ApartmentMemberRepository,
  ) {}

  async execute({
    userId,
    taskId,
  }: GetTaskRequest) {
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

    return task;
  }
}