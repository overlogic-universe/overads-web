import api from "@/core/lib/axios/axios-instance";
import { CreateAdsPayload, CreateAdsResponse } from "../types/create-ads";

export const createAds = async (
  payload: CreateAdsPayload
): Promise<CreateAdsResponse> => {
  const response = await api.post<CreateAdsResponse>("/ads", payload);
  console.log("RESPONSE CREATE ADS: ", response.data)
  return response.data;
};
