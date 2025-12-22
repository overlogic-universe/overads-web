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
  refresh: (opts?: { silent?: boolean }) => Promise<void>;
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
  const [pagination, setPagination] = useState<GetAdSchedulesResponse | null>(
    null,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // 🔁 Silent / normal refresh
  const refresh = useCallback(
    async ({ silent = false } = {}) => {
      if (!silent) setLoading(true);
      setError(null);

      try {
        const res = await getAdSchedules();

        // const sorted = [...res.data].sort(
        //   (a, b) =>
        //     new Date(a.scheduled_at).getTime() -
        //     new Date(b.scheduled_at).getTime(),
        // );

        setSchedules(res.data);
        setPagination(res);
      } catch (err: any) {
        if (!silent) {
          setError(err?.message ?? "Gagal mengambil jadwal iklan");
        }
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [],
  );

  // Manual refetch (pagination / action user)
  const fetchAdSchedules = useCallback(
    async (pageNumber = 1) => {
      await refresh({ silent: false });
      setPage(pageNumber);
    },
    [refresh],
  );

  // First load
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
        refresh, // ⬅️ penting
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
