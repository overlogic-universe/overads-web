import api from "@/core/lib/axios/axios-instance";
import { LoginResponse } from "../types/login";

interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/login", payload);
  return response.data;
};
