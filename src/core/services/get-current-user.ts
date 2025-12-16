import api from "@/core/lib/axios/axios-instance";
import { CurrentUser } from "../types/user";

export const getCurrentUser = async (): Promise<CurrentUser> => {
  const response = await api.get<CurrentUser>("/user");
  return response.data;
};
export const logout = async (): Promise<CurrentUser> => {
  const response = await api.post("/user");
  return response.data;
};
