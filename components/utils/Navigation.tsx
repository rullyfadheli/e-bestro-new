"use client";

import React, { JSX } from "react";

//components
import NavigationElement from "../laporan/NavigationElement";

function Navigation(): JSX.Element {
  type Data = {
    number: number;
    title: string;
    imgUrl: string;
  }[];

  const data: Data = [
    {
      number: 1,
      title: "Lapor KHS/Transkrip Nilai & Lapor Pembayaran UKT",
      imgUrl: "/1st.png",
    },
    {
      number: 2,
      title: "Lapor Prestasi",
      imgUrl: "/2nd.png",
    },
    {
      number: 3,
      title: "Lapor Perkembangan Diri",
      imgUrl: "/3rd.png",
    },
  ];

  return (
    <div className="pt-4 w-full pb-2 xl:w-full overflow-x-auto">
      <div className="flex w-[100px] xl:w-full gap-4 whitespace-nowrap">
        {data.map((items) => (
          <NavigationElement
            key={items.number}
            number={items.number}
            title={items.title}
            imgUrl={items.imgUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Navigation;
