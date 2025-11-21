import React, { JSX } from "react";

//Components
import TitleBanner from "@/components/utils/TitleBanner";
import Navigation from "@/components/utils/Navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import FormSectionTitle from "@/components/ui/FormSectionTitle";
import InputForm from "@/components/laporan/InputForm";

import { AppSidebar } from "@/components/utils/app-sidebar";

function LaporanTranskrip(): JSX.Element {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-full pb-4 bg-grey relative">
        <SidebarTrigger className="absolute top-9 bg-white md:-left-4 z-30 border-2 border-mainBG" />
        <div>
          <TitleBanner
            title="Pelaporan Hasil Belajar"
            subTitle={`Penerima Beasiswa BESTRO wajib melaporkan perkembangan\nhasil belajar secara berkala setiap semester`}
          />
          <div className="pl-6">
            <Navigation />
            <FormSectionTitle title="Entry Laporan Hasil Belajar" />
            <InputForm />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
export default LaporanTranskrip;
