import DashboardLayout from "@/core/layout/dashboard-layout";
import CreateForm from "@/modules/schedule";
import { GetCurrentUserProvider } from "@/core/providers/get-current-user-provider";
import { AdSchedulesProvider } from "@/modules/schedule/providers/ad-schedules-provider";
import { AdsProvider } from "@/modules/schedule/providers/ads-provider";

export default function Page() {
  return (
    <GetCurrentUserProvider>
      <DashboardLayout>
        <AdSchedulesProvider>
          <AdsProvider>
            <CreateForm />
          </AdsProvider>
        </AdSchedulesProvider>
      </DashboardLayout>
    </GetCurrentUserProvider>
  );
}
