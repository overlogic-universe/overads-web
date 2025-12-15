// core/hooks/use-create-ad-schedule.ts
import { useState } from "react";
import { createAdSchedule } from "../services/create-ad-schedule";
import { CreateAdScheduleResponse, CreateAdSchedulePayload } from "../types/create-ad-schedule";

export const useCreateAdSchedule = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CreateAdScheduleResponse | null>(null);

  const mutate = async (adId: number, payload: CreateAdSchedulePayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await createAdSchedule(adId, payload);
      setData(res);
      return res;
    } catch (err: any) {
      setError(err?.message ?? "Gagal menjadwalkan iklan");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error, data };
};
