"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AdSchedule, GetAdSchedulesResponse } from "@/core/types/ad";
import { getAdSchedules } from "../services/get-ad-shedules";

interface AdSchedulesContextValue {
  schedules: AdSchedule[];
  pagination: GetAdSchedulesResponse | null;

  loading: boolean;
  error: string | null;

  page: number;
  setPage: (page: number) => void;

  refetch: (page?: number) => Promise<void>;
}

const AdSchedulesContext = createContext<AdSchedulesContextValue | undefined>(
  undefined,
);

export const AdSchedulesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [schedules, setSchedules] = useState<AdSchedule[]>([]);
  const [pagination, setPagination] =
    useState<GetAdSchedulesResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchAdSchedules = useCallback(async (pageNumber = 1) => {
    setLoading(true);
    setError(null);

    try {
      const res = await getAdSchedules();

      // urutkan terbaru dulu (scheduled_at DESC)
      const sorted = [...res.data].sort(
        (a, b) =>
          new Date(b.scheduled_at).getTime() -
          new Date(a.scheduled_at).getTime(),
      );

      setSchedules(sorted);
      setPagination(res);
      setPage(pageNumber);
    } catch (err: any) {
      setError(err?.message ?? "Gagal mengambil jadwal iklan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdSchedules(1);
  }, [fetchAdSchedules]);

  return (
    <AdSchedulesContext.Provider
      value={{
        schedules,
        pagination,
        loading,
        error,
        page,
        setPage,
        refetch: fetchAdSchedules,
      }}
    >
      {children}
    </AdSchedulesContext.Provider>
  );
};

export const useAdSchedules = () => {
  const ctx = useContext(AdSchedulesContext);

  if (!ctx) {
    throw new Error(
      "useAdSchedules harus digunakan di dalam AdSchedulesProvider",
    );
  }

  return ctx;
};
