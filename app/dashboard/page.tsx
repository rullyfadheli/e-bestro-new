import React, { JSX } from "react";
import Banner from "@/components/dashboard/Banner";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import Card from "@/components/dashboard/Card";
import Semester from "@/components/dashboard/Semester";
import EventCalendar from "@/components/dashboard/EventCalendar";

//sidebar
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/utils/app-sidebar";

function Dashboard(): JSX.Element {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full h-full pb-4 bg-mainBG relative">
        <SidebarTrigger className="absolute top-9 bg-white md:-left-4 z-30 border-2 border-mainBG" />
        <Banner />
        <div className="grid h-full lg:grid-cols-2 m-4">
          <div className="w-full grid grid-cols-1">
            <PerformanceChart />
            <Semester />
          </div>
          <div className="w-full px-4 pt-2">
            <Card />
            <EventCalendar />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}

export default Dashboard;
