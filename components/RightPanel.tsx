import Image from "next/image";

export default function RightPanel() {
  return (
    <div className="relative hidden lg:flex w-1/2 items-center justify-center overflow-hidden bg-secondary">
      {/* Decorative Shapes */}
      <Image
        src="/blob2.png"
        alt="Blob"
        width={400}
        height={300}
        className="absolute -right-20 -top-50 w-[400px] h-[300px] z-0"
      />
      <Image
        src="/blob3.png"
        alt="Blob"
        width={300}
        height={200}
        className="absolute -left-40 top-30 w-[300px] h-[200px] z-0"
      />
        <Image
        src="/blob-big.png"
        alt="Blob"
        width={500}
        height={500}
        className="absolute right-0 -bottom-20 w-[600px] h-[500px] z-0"
        />
      <div className="z-10 text-center text-white px-10">
        <div className="absolute top-[100px] left-[200px] z-99">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2 leading-tight">
            Welcome to
            <br />
            <span className="font-bold text-white text-4xl lg:text-5xl">
              e-BESTRO
            </span>
          </h1>
          <p className="text-sm text-gray-100 mt-1">
            Login to access your account
          </p>
        </div>
        <Image
          src="/welcome-illustration.png"
          alt="Ilustrasi"
          width={700}
          height={700}
          className="absolute mt-8 mx-auto  right-0 bottom-0"
        />
      </div>
    </div>
  );
}
