import React from "react";
import DashboardLayout from "@/core/layout/dashboard-layout";
import CreateForm from "@/modules/dashboard/settings-layout";
import { GetCurrentUserProvider } from "@/core/providers/get-current-user-provider";

export default function Page() {
  return (
    <GetCurrentUserProvider>
      <DashboardLayout>
        <CreateForm />
      </DashboardLayout>
    </GetCurrentUserProvider>
  );
}
