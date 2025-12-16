import api from "@/core/lib/axios/axios-instance";
import { PackageResponse } from "../types/package";

export const getPackages = async (): Promise<PackageResponse> => {
  const response = await api.get<PackageResponse>("/packages");
  return response.data;
};
