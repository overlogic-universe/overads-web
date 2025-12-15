import { useEffect, useState } from "react";
import { getPackages } from "../services/get-packages";
import { PackageItem } from "../types/package";

interface UsePackagesResult {
  data: PackageItem[];
  loading: boolean;
  error: string | null;
}

export const usePackages = (): UsePackagesResult => {
  const [data, setData] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await getPackages();
        setData(response.data);
      } catch (err: any) {
        setError(err?.message || "Gagal mengambil data package");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return { data, loading, error };
};
