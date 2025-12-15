

// core/services/create-ad-schedule.ts
import api from "@/core/lib/axios/axios-instance";
import { CreateAdSchedulePayload, CreateAdScheduleResponse } from "../types/create-ad-schedule";

export const createAdSchedule = async (
  adId: number,
  payload: CreateAdSchedulePayload
): Promise<CreateAdScheduleResponse> => {
  const response = await api.post<CreateAdScheduleResponse>(
    `/ads/${adId}/schedule`,
    payload
  );
  return response.data;
};
