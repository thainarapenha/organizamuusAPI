import { User } from "@/domain/entities/User";

export interface UserRepository {
    create(user: User): Promise<void>

    findByUserId(userId: string): Promise<User | null>

    findByEmail(email: string): Promise<User | null>

    findByGoogleId(googleId: string): Promise<User | null>
}