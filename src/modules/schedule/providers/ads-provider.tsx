"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Ad, GetAdsResponse } from "@/core/types/ad";
import { getAds } from "../services/get-ads";

interface AdsContextValue {
  ads: Ad[];
  pagination: GetAdsResponse | null;

  loading: boolean;
  error: string | null;

  page: number;
  setPage: (page: number) => void;

  refetch: (page?: number) => Promise<void>;
}

const AdsContext = createContext<AdsContextValue | undefined>(undefined);

export const AdsProvider = ({ children }: { children: React.ReactNode }) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [pagination, setPagination] = useState<GetAdsResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchAds = useCallback(async (pageNumber = 1) => {
    setLoading(true);
    setError(null);

    try {
      const res = await getAds();

      // urutkan terbaru dulu
      const sorted = [...res.data].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

      setAds(sorted);
      setPagination(res);
      setPage(pageNumber);
    } catch (err: any) {
      setError(err?.message ?? "Gagal mengambil data iklan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAds(1);
  }, [fetchAds]);

  return (
    <AdsContext.Provider
      value={{
        ads,
        pagination,
        loading,
        error,
        page,
        setPage,
        refetch: fetchAds,
      }}
    >
      {children}
    </AdsContext.Provider>
  );
};

export const useAds = () => {
  const ctx = useContext(AdsContext);

  if (!ctx) {
    throw new Error("useAds harus digunakan di dalam AdsProvider");
  }

  return ctx;
};
