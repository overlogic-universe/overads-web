import api from "@/core/lib/axios/axios-instance";
import { GetAdSchedulesResponse } from "@/core/types/ad";

export const getAdSchedules = async (): Promise<GetAdSchedulesResponse> => {
  const response = await api.get<GetAdSchedulesResponse>("/ad-schedules");

  return response.data;
};
