import api from "@/core/lib/axios/axios-instance";
import { GetAdsResponse } from "@/core/types/ad";

export const getAds = async (): Promise<GetAdsResponse> => {
  const response = await api.get<GetAdsResponse>("/ads");
  return response.data;
};
