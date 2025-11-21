import React, { JSX } from "react";
import Image from "next/image";

function Banner(): JSX.Element {
  return (
    <div className="bg-secondary md:pl-8 lg:pl-50 w-full h-content md:h-56 flex flex-col md:flex-row md:justify-between items-center px-6">
      <div>
        <div className="w-72 md:w-full text-white">
          {/* Greetings */}
          <p className="font-bold text-2xl font-poppins">Berkas Administrasi</p>
          <p className="font-poppins font-light mt-2">
            Dokumen administrasi data pribadi penerima BESTRO
          </p>
        </div>
      </div>

      <div className="flex md:justify-end lg:pr-20">
        {/* Bestro Logo */}
        <div className="flex items-center">
          <Image
            src={"/logo bestro white 1.png"}
            width={150}
            height={50}
            alt="Bestro logo"
            className="w-50"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
