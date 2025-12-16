import DashboardLayout from "@/core/layout/dashboard-layout";
import CreateForm from "@/modules/create-ad";
import { AppProvider } from "@/core/providers/app-provider";

export default function Page() {
  return (
    <AppProvider>
      <DashboardLayout>
        <div className="container overflow-hidden">
          <h2 className="mb-8 text-2xl font-semibold">Buat Iklan baru</h2>
          <CreateForm />
        </div>
      </DashboardLayout>
    </AppProvider>
  );
}
