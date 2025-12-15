"use client";

import { useState } from "react";
import { createAds } from "../services/create-ads";
import { CreateAdsPayload, CreateAdsResponse } from "../types/create-ads";

export const useCreateAds = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CreateAdsResponse | null>(null);

  const submit = async (payload: CreateAdsPayload) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createAds(payload);
      setData(result);
      return result;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Gagal membuat iklan";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    data,
    loading,
    error,
  };
};
