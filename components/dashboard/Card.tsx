import React, { JSX } from "react";
import Image from "next/image";
import Link from "next/link";

function Card(): JSX.Element {
  type CardData = {
    title: string;
    image: string;
    number: number;
    backgroundColor: string;
  }[];

  const cardData: CardData = [
    {
      title: "Prestasi & Penghargaan",
      image: "/trophy.png",
      number: 5,
      backgroundColor: "rgba(255, 98, 80, 0.2)",
    },
    {
      title: "Kegiatan Non-Akademik",
      image: "/Save the Children.png",
      number: 7,
      backgroundColor: "rgba(0, 147, 121, 0.2)",
    },
    {
      title: "Pelatihan & Sertifikasi",
      image: "/Course Assign.png",
      number: 12,
      backgroundColor: "rgba(218, 55, 255, 0.2)",
    },
  ];

  // console.log(cardData);

  return (
    <div className="container mx-auto ">
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cardData.map((data, index) => (
          <div
            key={index}
            className="font-poppins flex flex-col md:h-92 w-full justify-between items-center bg-white rounded-lg px-4 py-10"
          >
            <div
              style={{ backgroundColor: data.backgroundColor }}
              className="flex justify-center h-15 sm:h-full max-h-20 w-15 sm:w-full max-w-20 items-center rounded-lg relative"
            >
              <Image src={data.image} width={30} height={30} alt="card image" />
            </div>
            <h2 className="md:text-xl w-40 text-center font-bold text-[#2D2D2D]">
              {data.title}
            </h2>
            <p className="text-3xl font-bold text-[#2D2D2D]">{data.number}</p>
            <Link
              className="text-secondary flex flex-col items-center sm:flex-row text-sm sm:text-md sm:font-bold"
              href={"/details"}
            >
              Lihat Detail
              <Image
                src={"/ArrowRight.png"}
                width={10}
                height={5}
                alt="Arrow"
                className="ml-1"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
