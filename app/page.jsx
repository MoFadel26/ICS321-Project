import Image from "next/image";
import * as React from "react";
import ReservationDialog from "./UI/Homepage/reservationPopup";
import BookButton from "./UI/Homepage/bookButton";

export default async function Home() {
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-center sm:flex-row p-6 items-center gap-8 mb-12">
          <div className="w-1/2 ">
            <div className=" font-bold text-left sm:text-8xl text-4xl">
              Travel with us
            </div>
            <span className="font-semibold text-left sm:text-5xl text-2xl">
              for a &nbsp;
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                futuer full of suprises
              </span>
            </span>
          </div>
          <div className="w-1/2 flex flex-col justify-center gap-5 mb-4">
            <Image
              alt="Hero"
              src="/Hero.png"
              width="5000"
              height="5000"
              className="w-full items-center"
            />
            <div className="flex flex-row justify-between  gap-5">
              <BookButton />
              <ReservationDialog className="w-1/2 text-black border-cyan-500 font-medium" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
