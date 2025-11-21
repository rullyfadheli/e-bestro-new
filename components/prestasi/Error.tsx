import { JSX } from "react";

function Error({ message }: { message: string }): JSX.Element {
  return (
    <div className="w-full h-24 flex justify-center items-center border border-gray-700">
      <p className="text-secondary text-lg font-poppins">{message}</p>
    </div>
  );
}

export default Error;
