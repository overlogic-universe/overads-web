import api from "@/core/lib/axios/axios-instance";
import { ApiKeyResponse, UpdateApiKeyPayload, UpdateApiKeyResponse } from "../types/api-key";

export const apiKeyService = {
  getApiKey: async (): Promise<ApiKeyResponse> => {
    const response = await api.get<ApiKeyResponse>(
      "/settings/apikey"
    );
    console.log("GET DATA: ", response.data)
    return response.data;
},

updateApiKey: async (
    payload: UpdateApiKeyPayload
): Promise<UpdateApiKeyResponse> => {
    const response = await api.post<UpdateApiKeyResponse>(
        "/settings/apikey",
        payload
    );
    console.log("UPDATE DATA: ", response.data)
    return response.data;
},
};