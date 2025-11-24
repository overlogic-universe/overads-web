import React from "react";
import DashboardLayout from "@/layout/dashboard-layout";
import CreateForm from "@/modules/dashboard/CreateScheduleForm";


export default function Page() {
return (
<DashboardLayout>
<CreateForm />
</DashboardLayout>
);
}