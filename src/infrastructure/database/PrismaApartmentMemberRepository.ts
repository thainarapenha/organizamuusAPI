import { PrismaClient } from "@prisma/client";
import { ApartmentMember } from "@/domain/entities/ApartmentMember";
import { ApartmentMemberRepository } from "@/domain/repositories/ApartmentMemberRepository";

export class PrismaApartmentMemberRepository implements ApartmentMemberRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<ApartmentMember | null> {
    const apartmentMember = await this.prisma.apartmentMember.findUnique({
      where: {
        id,
      },
    });

    if (!apartmentMember) {
      return null;
    }

    return new ApartmentMember({
      id: apartmentMember.id,
      userId: apartmentMember.userId,
      apartmentId: apartmentMember.apartmentId,
      createdAt: apartmentMember.createdAt,
      updatedAt: apartmentMember.updatedAt,
    });
  }

  async findByUserId(userId: string): Promise<ApartmentMember | null> {
    const apartmentMember = await this.prisma.apartmentMember.findUnique({
      where: {
        userId,
      },
    });

    if (!apartmentMember) {
      return null;
    }

    return new ApartmentMember({
      id: apartmentMember.id,
      userId: apartmentMember.userId,
      apartmentId: apartmentMember.apartmentId,
      createdAt: apartmentMember.createdAt,
      updatedAt: apartmentMember.updatedAt,
    });
  }
}