import React, { JSX } from "react";
import Image from "next/image";

// components
import BannerStudentName from "./BannerStudentName";
function Banner(): JSX.Element {
  return (
    <div className="bg-primary md:pl-8 lg:pl-50 w-full h-content md:h-56 flex flex-col md:flex-row md:justify-between items-center px-6 pt-6">
      <div>
        <div className="w-72 lg:w-full">
          {/* Greetings */}
          <p className="font-bold text-2xl font-poppins">
            &ldquo;You have proven your potential. Now, Go Beyond!&rdquo;
          </p>
          <BannerStudentName />
        </div>
      </div>

      <div className="h-62 w-full flex md:justify-end lg:pr-20">
        {/* Mobile Mockup */}
        <div className="overflow-hidden pt-2 flex h-62 md:h-56 w-full max-w-64">
          <div className="bg-secondary relative flex justify-center w-full max-w-72 h-64 rounded-t-[100px] mt-30">
            <Image
              src={"/star.png"}
              width={30}
              height={30}
              alt="star"
              className="absolute hidden sm:block translate-x-[-110px] translate-y-[-40px]"
            />
            <Image
              src={"/Mobile Mockup.png"}
              width={200}
              height={346}
              alt="Mobile"
              className="object-cover relative left-2 overflow-x-hidden h-62 md:h-56 translate-y-[-110px]"
            />
          </div>
        </div>
        {/* Bestro Logo */}
        <div className="pt-4">
          <Image
            src={"/logo bestro white 1.png"}
            width={150}
            height={50}
            alt="Bestro logo"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
