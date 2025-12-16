"use client";

import { ApiKeyProvider } from "@/modules/settings/providers/api-key-provider";
import { GetCurrentUserProvider } from "./get-current-user-provider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <GetCurrentUserProvider>
      <ApiKeyProvider> {children}</ApiKeyProvider>
    </GetCurrentUserProvider>
  );
  //   return <div>
  // {children}
  // </div>;
}
