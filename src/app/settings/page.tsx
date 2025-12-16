import DashboardLayout from "@/core/layout/dashboard-layout";
import CreateForm from "@/modules/settings/settings-layout";
import { AppProvider } from "@/core/providers/app-provider";

export default function Page() {
  return (
    <AppProvider>
      <DashboardLayout>
        <CreateForm />
      </DashboardLayout>
    </AppProvider>
  );
}
