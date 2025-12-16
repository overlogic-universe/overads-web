// src/providers/ApiKeyProvider.tsx
import { createContext, useContext, ReactNode } from "react";
import { useApiKey } from "../hooks/use-api-key";

type ApiKeyContextType = ReturnType<typeof useApiKey>;

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const value = useApiKey();

  return (
    <ApiKeyContext.Provider value={value}>{children}</ApiKeyContext.Provider>
  );
};

export const useApiKeyContext = () => {
  const context = useContext(ApiKeyContext);

  if (!context) {
    throw new Error("useApiKeyContext harus digunakan di dalam ApiKeyProvider");
  }

  return context;
};
