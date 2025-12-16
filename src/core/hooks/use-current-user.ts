import { useEffect, useState } from "react";
import { CurrentUser } from "../types/user";
import { getCurrentUser } from "../services/get-current-user";

export const useCurrentUser = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await getCurrentUser();
        setUser(data);
      } catch (err: any) {
        setError(err?.response?.data?.message ?? "Gagal mengambil data user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
