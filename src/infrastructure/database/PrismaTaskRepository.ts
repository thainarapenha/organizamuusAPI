import { PrismaClient } from "@prisma/client";
import {
  Task,
  TaskRecurrence,
  TaskRoom,
  TaskStatus,
} from "@/domain/entities/Task";
import { TaskRepository } from "@/domain/repositories/TaskRepository";

export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(task: Task): Promise<void> {
    await this.prisma.task.create({
      data: {
        id: task.id,
        apartmentId: task.apartmentId,
        responsibleMemberId: task.responsibleMemberId,
        createdByMemberId: task.createdByMemberId,
        room: task.room,
        description: task.description,
        startDate: task.startDate,
        endDate: task.endDate,
        recurrence: task.recurrence,
        status: task.status,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
    });
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      return null;
    }

    return this.toDomain(task);
  }

  async findByApartmentId(apartmentId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        apartmentId,
      },
    });

    return tasks.map((task) => this.toDomain(task));
  }

  async findByResponsibleMemberId(
    responsibleMemberId: string
  ): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        responsibleMemberId,
      },
    });

    return tasks.map((task) => this.toDomain(task));
  }

  private toDomain(task: {
    id: string;
    apartmentId: string;
    responsibleMemberId: string;
    createdByMemberId: string;
    room: string;
    description: string;
    startDate: Date;
    endDate: Date;
    recurrence: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }): Task {
    return new Task({
      id: task.id,
      apartmentId: task.apartmentId,
      responsibleMemberId: task.responsibleMemberId,
      createdByMemberId: task.createdByMemberId,
      room: task.room as TaskRoom,
      description: task.description,
      startDate: task.startDate,
      endDate: task.endDate,
      recurrence: task.recurrence as TaskRecurrence,
      status: task.status as TaskStatus,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
  }
}