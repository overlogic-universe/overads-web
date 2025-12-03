import React from "react";
import DashboardLayout from "@/core/layout/dashboard-layout";
import CreateForm from "@/modules/dashboard/create-schedule-form";

export default function Page() {
  return (
    <DashboardLayout>
      <CreateForm />
    </DashboardLayout>
  );
}
