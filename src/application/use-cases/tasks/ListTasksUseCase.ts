import { AppError } from "@/application/errors/AppError";
import { ApartmentMemberRepository } from "@/domain/repositories/ApartmentMemberRepository";
import { Task } from "@/domain/entities/Task";
import { TaskRepository } from "@/domain/repositories/TaskRepository";

export class ListTasksUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly apartmentMemberRepository: ApartmentMemberRepository,
  ) {}

  async execute(userId: string): Promise<Task[]> {
    const apartmentMember =
      await this.apartmentMemberRepository.findByUserId(userId);

    if (!apartmentMember) {
      throw new AppError("User is not associated with an apartment.", 403);
    }

    return this.taskRepository.findByApartmentId(
      apartmentMember.apartmentId,
    );
  }
}