import React, { JSX } from "react";
import Image from "next/image";
import Link from "next/link";

type EventData = {
  title: string;
  description: string;
  category: string;
  image: string;
};
function EventCard(data: EventData): JSX.Element {
  const { title, description, category, image } = data;

  return (
    <Link href={"/"}>
      <div className="w-full bg-primary h-92 flex flex-col rounded-3xl hover:shadow-lg transition-shadow duration-300">
        <div className="w-full h-50">
          <Image
            src={image}
            width={400}
            height={400}
            alt="Event Image"
            className="w-full h-full"
          />
        </div>
        <div className="flex bg-white flex-col p-4 gap-2 rounded-b-3xl">
          <h2 className="font-bold font-poppins">{title}</h2>
          <p className="font-poppins mb-6 line-clamp-2">{description}</p>
          <p className="font-poppins text-secondary">{category}</p>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
