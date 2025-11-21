"use client";

import React, { JSX } from "react";
// import Image from "next/image";
// import Link from "next/link";
import EventCard from "./EventCard";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function EventCalendar(): JSX.Element {
  type CarouselData = {
    title: string;
    description: string;
    category: string;
    image: string;
  }[];

  const dataCarousel: CarouselData = [
    {
      title: "Music Festival",
      description: "A weekend of live performances by top artists.",
      category: "Entertainment",
      image: "/eventImage.png",
    },
    {
      title: "Tech Conference",
      description:
        "Annual gathering of technology enthusiasts and professionals.",
      category: "Technology",
      image: "/eventImage.png",
    },
    {
      title: "Charity Run",
      description: "A marathon to raise funds for children's education.",
      category: "Sports",
      image: "/eventImage.png",
    },
    {
      title: "Art Exhibition",
      description: "Showcasing works from talented painters and sculptors.",
      category: "Culture",
      image: "/eventImage.png",
    },
    {
      title: "Food Festival",
      description: "A celebration of global cuisine with renowned chefs.",
      category: "Culinary",
      image: "/eventImage.png",
    },
    {
      title: "Startup Pitch",
      description:
        "Entrepreneurs presenting innovative business ideas to investors.",
      category: "Business",
      image: "/eventImage.png",
    },
    {
      title: "Gaming Tournament",
      description: "Competitive event featuring the best eSports players.",
      category: "Gaming",
      image: "/eventImage.png",
    },
    {
      title: "Book Fair",
      description: "A marketplace featuring books from various genres.",
      category: "Literature",
      image: "/eventImage.png",
    },
    {
      title: "Science Workshop",
      description:
        "Interactive sessions on groundbreaking scientific research.",
      category: "Education",
      image: "/eventImage.png",
    },
  ];

  return (
    <div className="bg-secondary relative w-full sm:h-full sm:max-h-[583px] rounded-lg p-8 mt-3">
      <div className="flex justify-between">
        <span className="text-white font-bold font-poppins text-2xl md:text-5xl">
          Kalender Event
        </span>
        <div></div>
      </div>

      <div className="my-5">
        <p className="text-white font-mulish text-md">
          Temukan jadwal lengkap berbagai kegiatan dan acara penting penerima
          BESTRO. Jangan lewatkan momen berharga yang sudah kami siapkan untuk
          Anda!
        </p>
      </div>
      <div className="h-96 w-full">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent className="flex h-full">
            {dataCarousel.map((data, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 xl:basis-1/3 h-full w-2 flex justify-center"
              >
                <EventCard
                  title={data.title}
                  description={data.description}
                  category={data.category}
                  image={data.image}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden p-4 lg:flex justify-center items-center absolute md:top-[-100px] xl:top-[-130px] right-76" />
          <CarouselNext className="hidden lg:flex justify-center items-center absolute md:top-[-100px] xl:top-[-130px] right-2" />{" "}
        </Carousel>
      </div>
    </div>
  );
}

export default EventCalendar;
