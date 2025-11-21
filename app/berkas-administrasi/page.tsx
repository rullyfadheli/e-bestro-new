"use client";

import dynamic from "next/dynamic";
import Banner from "@/components/berkas-administrasi/Banner";
import DocumentMenu from "@/components/berkas-administrasi/DocumentMenu";

// Sidebar component imports
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/utils/app-sidebar";

/**
 * Dynamically import the PDFviewer component.
 * * We must set `ssr: false` because @react-pdf-viewer relies heavily on
 * browser-specific APIs (window, document, canvas) which are not available
 * on the server. Attempting to render this on the server will cause errors.
 */
const PDFviewer = dynamic(
  () => import("@/components/berkas-administrasi/PDFviewer"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 w-full bg-gray-100 animate-pulse flex items-center justify-center">
        Loading PDF...
      </div>
    ),
  }
);

function BerkasAdministrasi() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-mainBG w-full h-screen relative">
        <SidebarTrigger className="absolute top-9 bg-white md:-left-4 z-30 border-2 border-mainBG" />
        <Banner />
        <div className="grid lg:grid-cols-3 grid-cols-1 py-4">
          <DocumentMenu />
          <div className="lg:col-span-2 col-span-1 px-4">
            <PDFviewer />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}

export default BerkasAdministrasi;
