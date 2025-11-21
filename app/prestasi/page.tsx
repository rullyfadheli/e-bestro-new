import React, { JSX } from "react";
// header components
import TitleBanner from "@/components/utils/TitleBanner";
import Navigation from "@/components/utils/Navigation";

// main components
import FormProgressBar from "@/components/ui/FormProgressBar";
import FormSectionTitle from "@/components/ui/FormSectionTitle";
import Button from "@/components/Button";
import AchievementLevel from "@/components/prestasi/AchivementLevel";
import AchivementName from "@/components/prestasi/AchivementName";
import Organizer from "@/components/prestasi/Organizer";
import AcquiredYear from "@/components/prestasi/AcquiredYear";
import List from "@/components/prestasi/List";

// sidebar components
import { AppSidebar } from "@/components/utils/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UploadAchievement from "@/components/prestasi/UploadAchievement";
import Submit from "@/components/prestasi/Submit";

function UnggahPrestasi(): JSX.Element {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="parent w-full h-fit min-h-screen pb-28 bg-mainBG relative">
        <SidebarTrigger className="absolute top-9 bg-white md:-left-4 z-30 border-2 border-mainBG" />
        <div className="">
          <TitleBanner
            title="Entry Prestasi / Penghargaan"
            subTitle="Unggah bukti prestasi atau penghargaan yang pernah diperoleh."
          />
          <Navigation />
          <div className="px-6 py-3 bg-white m-2 rounded-lg border-1 border-gray-200">
            <FormSectionTitle title="Entry Prestasi / Penghargaan" />
            <FormProgressBar />

            <div className="flex justify-start mt-4">
              <Button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded">
                + Tambah Data
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-4">
              <div className="col-span-1">
                <AchivementName />
                <Organizer />
                <AchievementLevel />
              </div>
              <div className="col-span-1">
                <AcquiredYear />
                <UploadAchievement />
              </div>
              {/* Achievement List Section */}
              <List />
            </div>
            <Submit />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}

export default UnggahPrestasi;
