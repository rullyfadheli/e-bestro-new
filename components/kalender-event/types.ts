// components/kalender-acara/types.ts
export interface EventListItemData {
  id: string;
  day: string;
  monthYear: string; // Mis: "MEI 2025"
  type: string; // Mis: "Webinar", "Kompetisi BESTRO"
  title: string;
  description: string;
}

export interface FeaturedEventData {
  id: string;
  tag?: string; // Mis: "Sinergi Bicara"
  title: string;
  fullDate: string; // Mis: "Selasa, 27 Mei 2025"
  time: string;
  platform: string; // Mis: "Zoom"
  platformIcon?: React.ReactNode; // Untuk ikon seperti ikon Zoom
  speakers: string[];
  registrationLink: string;
  backgroundImageUrl: string;
}

export interface CalendarDay {
  day: number | null;
  isCurrentMonth: boolean;
  isToday?: boolean;
  isSelected?: boolean;
}