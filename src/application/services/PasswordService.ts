export interface PasswordService {
  hash(password: string): Promise<string>;

  compare(password: string, passwordHash: string): Promise<boolean>;
}