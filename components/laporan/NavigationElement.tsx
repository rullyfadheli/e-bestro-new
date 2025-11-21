import React, { JSX } from "react";
import Image from "next/image";

function NavigationElement({
  number,
  title,
  imgUrl,
}: {
  number: number;
  title: string;
  imgUrl: string;
}): JSX.Element {
  return (
    <div className="bg-primary  py-1 pl-1 pr-4 md:pr-4 flex gap-2 relative rounded-xl font-poppins">
      <div className="bg-white p-[calc(var(--spacing) * 0.1)] rounded-full">
        <Image
          src={imgUrl}
          width={20}
          height={20}
          className="w-7 h-7"
          alt="number icon"
        />
      </div>
      <div className="flex items-center text-sm font-semibold font-lato">
        {title}
      </div>
      <Image
        src={"/Next page.png"}
        width={60}
        height={60}
        className={`w-9 h-9 absolute top-0 -right-6 z-10 ${
          number === 3 && "hidden"
        }`}
        alt="next page icon"
      />
    </div>
  );
}

export default NavigationElement;
