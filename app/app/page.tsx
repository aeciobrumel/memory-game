'use client';
import LogoImg from "../app/assets/puzzle-piece.svg";
import Image from "next/image";
import { InfoItem } from "./components/InfoItem";
import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import restart from "./assets/restart.svg";
import { GridItemType } from "./types/GridItem";
import { items } from "./data/items";
import { GridItem } from "./components/GridItem";

export default function Home() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  const resetAndCreateGrid = () => {
    setTime(0);
    setMoves(0);
    setShowCount(0);

    setGridItems([]);
    let tmpGrid: GridItemType[] = [];

    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({ item: null, show: true, permanentShow: false });
    }

    //preencher o grid
    for (let item = 0; item < 2; item++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }
    setGridItems(tmpGrid);
    setPlaying(true);
  }
  const handleItemClick = (index: number) => {
  }

  useEffect(() => {
    resetAndCreateGrid();
  }
    , []);

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
        <Button Icon={restart} onClick={resetAndCreateGrid} />
      </div>
      <div className="flex flex-1 justify-end max-[750px]:mx-[20px] max-[750px]:justify-center">
        <div className="grid grid-cols-4 gap-2 p-2 ">
          {gridItems.map((gridItem, index) => (
            <GridItem
              key={index}
              item={gridItem}
              onClick={() => handleItemClick(index)} />
          ))}
        </div>
      </div>


    </div>
  );
}
