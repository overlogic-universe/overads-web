import { User } from "@/core/types/user";

export interface LoginResponse {
  user: User;
  token: string;
}
