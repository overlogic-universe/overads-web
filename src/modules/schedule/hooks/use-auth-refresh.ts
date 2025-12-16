import { useEffect, useRef } from "react";
import { useAdSchedules } from "../providers/ad-schedules-provider";

export const useAutoRefreshAdSchedules = (intervalMs = 5000) => {
  const { refresh } = useAdSchedules();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await refresh({
          silent: true, // penting
        });
      } catch (err) {
        // optional: ignore error
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs, refresh]);
};
