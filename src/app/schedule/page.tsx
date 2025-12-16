import DashboardLayout from "@/core/layout/dashboard-layout";
import CreateForm from "@/modules/schedule";
import { AdSchedulesProvider } from "@/modules/schedule/providers/ad-schedules-provider";
import { AdsProvider } from "@/modules/schedule/providers/ads-provider";
import { AppProvider } from "@/core/providers/app-provider";
import { InstagramAccountProvider } from "@/modules/account/providers/instagram-account-provider";

export default function Page() {
  return (
    <AppProvider>
      <InstagramAccountProvider>
        <DashboardLayout>
          <AdSchedulesProvider>
            <AdsProvider>
              <CreateForm />
            </AdsProvider>
          </AdSchedulesProvider>
        </DashboardLayout>
      </InstagramAccountProvider>
    </AppProvider>
  );
}
