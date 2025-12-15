import api from "@/core/lib/axios/axios-instance";
import { GetAdSchedulesResponse } from "@/core/types/ad";

export const getAdSchedules = async (): Promise<GetAdSchedulesResponse> => {
  const response = await api.get<GetAdSchedulesResponse>("/ad-schedules");

  const sortedData = [...response.data.data].sort((a, b) => {
    return (
      new Date(b.scheduled_at).getTime() -
      new Date(a.scheduled_at).getTime()
    );
  });

  return {
    ...response.data,
    data: sortedData,
  };
};
