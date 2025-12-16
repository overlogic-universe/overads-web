// src/hooks/useApiKey.ts
import { useEffect, useState } from "react";
import { apiKeyService } from "../services/api-key";
import { ApiKeyResponse, UpdateApiKeyPayload } from "../types/api-key";

export const useApiKey = () => {
  const [data, setData] = useState<ApiKeyResponse>({
    apiKey: null,
    igId: null,
  });

  const [loading, setLoading] = useState(true);        // loading GET
  const [updating, setUpdating] = useState(false);    // loading UPDATE
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        setLoading(true);
        const res = await apiKeyService.getApiKey();
        setData(res);
      } catch (err: any) {
        setError(err?.message || "Gagal mengambil API Key");
      } finally {
        setLoading(false);
      }
    };

    fetchApiKey();
  }, []);

  const updateApiKey = async (payload: UpdateApiKeyPayload) => {
    try {
      setUpdating(true);
      setError(null);

      const res = await apiKeyService.updateApiKey(payload);
        console.log("REspon update success: ",res)

      if (res.ok) {
        const refreshed = await apiKeyService.getApiKey();
        setData(refreshed);
      }

      return res;
    } catch (err: any) {
        console.log("REspon update: ",error)
      setError(err?.message || "Gagal update API Key");
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return {
    apiKey: data.apiKey,
    igId: data.igId,
    loading,     // GET loading
    updating,    // UPDATE loading
    error,
    updateApiKey,
  };
};
