'use client';
import LogoImg from "../app/assets/puzzle-piece.svg";
import Image from "next/image";
import { InfoItem } from "./components/InfoItem";
import { useState } from "react";
import { Button } from "./components/Button";
import restart from "./assets/restart.svg";

export default function Home() {
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const handleRestart = () => {

  }

  return (

    <div className="mx-auto flex w-screen max-w-[750px] py-[50px] max-[750px]:flex-col">


      <div className="flex flex-col max-[750px]:m-[50px] max-[750px]:items-center ">
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="flex flex-row items-center justify-center text-2xl font-bold text-cyan-500">
            <Image src={LogoImg} alt="Next.js Logo" width={36} className="logo" />
            <div>Jogo da memória</div>
          </div>
        </a>

        <div className="my-[30px] w-full max-[750px]:flex max-[750px]:justify-around max-[750px]:text-center">
          <InfoItem label="Tempo" value={`${Math.floor(time / 60)}:${time % 60 < 10 ? "0" + time % 60 : time % 60}`} />
          <InfoItem label="Movimentos" value={moves} />
        </div>
        <Button Icon={restart} onClick={handleRestart} />
      </div>
      <div className="flex flex-1 justify-end max-[750px]:mx-[20px] max-[750px]:justify-center">
        ...
      </div>


    </div>
  );
}
