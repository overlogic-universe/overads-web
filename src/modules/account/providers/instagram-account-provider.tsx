"use client";

import { useApiKeyContext } from "@/modules/settings/providers/api-key-provider";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getInstagramAccount } from "../services/instagram-account";
import { InstagramAccount } from "../types/instagram-account";

interface InstagramAccountContextValue {
  account: InstagramAccount | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const InstagramAccountContext =
  createContext<InstagramAccountContextValue | undefined>(undefined);

export const InstagramAccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { apiKey, loading: apiKeyLoading } = useApiKeyContext();

  const [account, setAccount] = useState<InstagramAccount | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAccount = useCallback(async () => {
    if (!apiKey) {
      setAccount(null);
      setError("Akun Instagram belum terhubung");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getInstagramAccount(apiKey);
      setAccount(data);
    } catch (err: any) {
      setAccount(null);
      setError(err?.message || "Gagal mengambil akun Instagram");
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  // fetch ulang kalau apiKey berubah
  useEffect(() => {
    if (!apiKeyLoading) {
      fetchAccount();
    }
  }, [apiKeyLoading, fetchAccount]);

  return (
    <InstagramAccountContext.Provider
      value={{
        account,
        loading: loading || apiKeyLoading,
        error,
        refetch: fetchAccount,
      }}
    >
      {children}
    </InstagramAccountContext.Provider>
  );
};

export const useInstagramAccount = () => {
  const ctx = useContext(InstagramAccountContext);

  if (!ctx) {
    throw new Error(
      "useInstagramAccount harus digunakan di dalam InstagramAccountProvider",
    );
  }

  return ctx;
};
