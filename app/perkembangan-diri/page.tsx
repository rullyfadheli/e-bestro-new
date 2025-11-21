"use client";

import React, { JSX } from "react";
import TitleBanner from "@/components/utils/TitleBanner";

// sidebar
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/utils/app-sidebar";

import Navigation from "@/components/utils/Navigation";
import FormProgressBar from "@/components/ui/FormProgressBar";
import FormSectionTitle from "@/components/ui/FormSectionTitle";
import AcademicProgress from "@/components/perkembangan-diri/TextForm";
import FormSubmit from "@/components/perkembangan-diri/FormSubmit";

function PerkembanganDiri(): JSX.Element {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-full pb-4 bg-mainBG relative">
        <SidebarTrigger className="absolute top-9 bg-white md:-left-4 z-30 border-2 border-mainBG" />
        <div>
          <TitleBanner
            title="Entry Pelaporan Perkembangan Diri"
            subTitle="Isilah refleksi diri dan target pengembangan ke depan secara jelas dan jujur."
          />

          <div className="pl-6 pr-6">
            <Navigation />
            <FormSectionTitle title="Entry Pelaporan Perkembangan Diri" />
            <FormProgressBar />

            <AcademicProgress />
            <FormSubmit />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}

export default PerkembanganDiri;
