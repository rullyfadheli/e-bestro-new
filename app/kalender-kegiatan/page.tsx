import React, { JSX } from "react";
import Head from "next/head"; 
import MiniCalendar from '@/components/kalender-event/MiniCalendar';
import EventListItem from '@/components/kalender-event/EventListItem';
import FeaturedEvent from '@/components/kalender-event/FeaturedEvent';
import { EventListItemData, FeaturedEventData } from '@/components/kalender-event/types';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/utils/app-sidebar";
import TitleBanner from "@/components/utils/TitleBanner";

const eventListData: EventListItemData[] = [
  {
    id: '1',
    day: '27',
    monthYear: 'MEI 2025',
    type: 'Webinar',
    title: 'Membangun Kebiasaan Positif',
    description: 'Untuk Kesuksesan Jangka Panjang',
  },
  {
    id: '2',
    day: '30',
    monthYear: 'MEI 2025',
    type: 'Kompetisi BESTRO',
    title: 'HARVESTON - Agriculture Innovation Award 2025',
    description: 'Harveston - Agriculture Innovation Award 2025',
  },
  {
    id: '3',
    day: '31',
    monthYear: 'MEI 2025',
    type: 'BESTRO Mengabdi',
    title: 'Pemberdayaan Masyarakat DesaSumbersari Lamongan',
    description: 'Pemberdayaan Masyarakat DesaSumbersari Lamongan',
  },
];

const featuredEventData: FeaturedEventData = {
  id: 'event-featured-1',
  tag: 'Sinergi Bicara',
  title: 'Webinar: Membangun Kebiasaan Positif',
  fullDate: 'Selasa, 27 Mei 2025',
  time: '10.00 - 12.00 WIB',
  platform: 'Zoom',
  speakers: ['Rizqiani Putri', 'Anita Wijaya'],
  registrationLink: 'https://petro.kim/RegWebinar51',
  backgroundImageUrl: '/sinergibicara.jpg',
};

function KalenderKegiatan(): JSX.Element {
  return (
    <> 
      <Head>
        <title>Kalender Kegiatan - BESTRO</title>
        <meta name="description" content="Lihat, Kelola, dan Tambahkan semua acara penting BESTRO di satu tempat." />
      </Head>

      <SidebarProvider>
        <AppSidebar />
        <main className="w-full h-full pb-4 bg-gray-100 relative"> 
          <SidebarTrigger className="absolute top-9 md:top-6 bg-white md:-left-4 z-30 border-2 border-mainBG rounded-md p-2" />
          <TitleBanner
            title="Kalender Event BESTRO"
            subTitle="Lihat, Kelola, dan Tambahkan semua acara penting anda di satu tempat"
          />
          <div className="container mx-auto mt-6"> 
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/3 space-y-6">
                <MiniCalendar />
                <div className="space-y-4">
                  {eventListData.map(event => (
                    <EventListItem key={event.id} event={event} />
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-2/3 h-[500px]">
                <FeaturedEvent event={featuredEventData} />
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </>
  );
}

export default KalenderKegiatan;