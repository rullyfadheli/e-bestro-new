import Image from "next/image";

export default function LogoGroup() {
  return (
    <div className="flex items-center justify-center gap-4 mb-10">
      <div className="relative h-12 w-auto aspect-[3/1]">
        <Image
          src="/petrokimia-logo.png"
          alt="Petrokimia Gresik"
          fill
          className="object-contain"
        />
      </div>

      <div className="relative h-12 w-auto aspect-[3/1]">
        <Image
          src="/bestro-logo.png"
          alt="Petrokimia Gresik"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
