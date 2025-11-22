import React from "react";
import DashboardLayout from "@/layout/dashboard-layout";
import CreateForm from "@/modules/dashboard/CreateForm";

export default function Page() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-8 py-12">
        <h2 className="text-2xl font-semibold mb-8">Buat Iklan baru</h2>
        <CreateForm />
      </div>
    </DashboardLayout>
  );
}
