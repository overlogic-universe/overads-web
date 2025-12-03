import React from "react";
import DashboardLayout from "@/core/layout/dashboard-layout";
import CreateForm from "@/modules/dashboard/create-form";

export default function Page() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-8 py-12">
        <h2 className="mb-8 text-2xl font-semibold">Buat Iklan baru</h2>
        <CreateForm />
      </div>
    </DashboardLayout>
  );
}
