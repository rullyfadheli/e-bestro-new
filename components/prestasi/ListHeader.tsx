import { JSX } from "react";

function ListHeader(): JSX.Element {
  return (
    <div className="flex gap-2 text-center bg-[#EFF1F9] rounded-lg py-2 pl-2 md:w-full w-[700px] justify-between pr-2">
      <div className="">No.</div>
      <div className="w-full max-w-70 line-clamp-1">
        Nama Prestasi/Penghargaan
      </div>
      <div className="w-full max-w-70">Penyelenggara</div>
      <div className="w-full max-w-40">Tingkat Prestasi</div>
      <div className="w-full max-w-30">Tahun</div>
      <div className="w-full max-w-20">Tindakan</div>
    </div>
  );
}

export default ListHeader;
