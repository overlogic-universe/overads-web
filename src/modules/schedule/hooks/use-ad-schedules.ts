"use client";

import { AdSchedule, GetAdSchedulesResponse } from "@/core/types/ad";
import { useCallback, useEffect, useState } from "react";
import { getAdSchedules } from "../services/get-ad-shedules";


export const useAdSchedules = () => {
  const [data, setData] = useState<AdSchedule[]>([]);
  const [pagination, setPagination] =
    useState<GetAdSchedulesResponse | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const fetchAdSchedules = useCallback(async (pageNumber = 1) => {
    setLoading(true);
    setError(null);

    try {
      const res = await getAdSchedules();
      setData(res.data);
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

  return {
    schedules: data,
    pagination,
    loading,
    error,
    page,
    setPage,
    refetch: fetchAdSchedules,
  };
};
