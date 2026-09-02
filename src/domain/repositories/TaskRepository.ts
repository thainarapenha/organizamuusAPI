import { Task } from "@/domain/entities/Task";

export interface TaskRepository {
  create(task: Task): Promise<void>;

  findById(id: string): Promise<Task | null>;

  findByApartmentId(apartmentId: string): Promise<Task[]>;

  findByResponsibleMemberId(
    responsibleMemberId: string
  ): Promise<Task[]>;
}