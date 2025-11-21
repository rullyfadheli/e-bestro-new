import React, { JSX } from "react";
import Image from "next/image";

type DocumentMenuProps = { title: string; header?: string }[];

const data: DocumentMenuProps = [
  {
    title: "1. Surat Perjanjian Kontrak Bestro",
    header: "Dokumen Administrasi Pribadi",
  },
  { title: "2. Surat Pernyataan Keaslian Data" },
  { title: "3. Riwayat Data Diri Seleksi Bestro" },
];
function DocumentMenu(): JSX.Element {
  return (
    <div className="bg-mainBG p-4 w-full">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="px-8 py-6 bg-white rounded-lg mb-4 font-inter"
          >
            {item.header && (
              <div className="flex items-center gap-2">
                <Image
                  src={"/pdf-icon.png"}
                  width={10}
                  height={10}
                  alt="pdf icon"
                  className="w-5 h-5"
                />
                <span className="font-bold text-lg">{item.header}</span>
              </div>
            )}
            {item.header && (
              <hr className="my-2 border-t-2 border-b-0 border-x-0 w-full border-[#E1E3EA]"></hr>
            )}
            <div>
              <p className="mb-4">{item.title}</p>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 py-2 px-4 bg-lightBlack rounded-lg">
                  <Image
                    src={"/eye-icon.png"}
                    width={19}
                    height={13}
                    alt="eye icon"
                    className="w-4 h-4"
                  />
                  <span className="text-white">Preview</span>
                </button>
                <button className="flex items-center gap-2 py-2 px-4 bg-lightBlack rounded-lg">
                  <Image
                    src={"/download-icon.png"}
                    width={17}
                    height={10}
                    alt="download icon"
                    className="w-4 h-4"
                  />
                  <span className="text-white">Download</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DocumentMenu;
