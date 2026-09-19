import { Task } from "@/domain/entities/Task";
import { TaskRepository } from "@/domain/repositories/TaskRepository";

export class ListTasksUseCase {
  constructor(
    private readonly taskRepository: TaskRepository
  ) {}

  async execute(apartmentId: string): Promise<Task[]> {
    return this.taskRepository.findByApartmentId(apartmentId)
  }
}