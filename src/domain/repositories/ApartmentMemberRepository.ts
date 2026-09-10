import { ApartmentMember } from "../entities/ApartmentMember";

export interface ApartmentMemberRepository {
  findById(id: string): Promise<ApartmentMember | null>

  findByUserId(userId: string): Promise<ApartmentMember | null>
}