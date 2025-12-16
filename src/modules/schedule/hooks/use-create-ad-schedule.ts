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
  console.log("PAYLOAD RES CREATE SHCEDULE: ", payload)

      const res = await createAdSchedule(adId, payload);
      setData(res);
  console.log("RES CREATE SHCEDULE: ", res)
  
  return res;
} catch (err: any) {
      console.log("RES CREATE SHCEDULE ERRORR: ", err)
      setError(err?.message ?? "Gagal menjadwalkan iklan");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error, data };
};
