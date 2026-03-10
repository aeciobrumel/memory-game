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
import { formatTimeElapsed } from "./helpers/formatTimeElapsed";

export default function Home() {
    const [playing, setPlaying] = useState<boolean>(false);
    const [moves, setMoves] = useState<number>(0);
    const [time, setTime] = useState<number>(0);
    const [showCount, setShowCount] = useState<number>(0);
    const [gridItems, setGridItems] = useState<GridItemType[]>([]);
    const hasWon = !playing && moves > 0;

    const resetAndCreateGrid = () => {
        setTime(0);
        setMoves(0);
        setShowCount(0);
        setGridItems([]);
        let tmpGrid: GridItemType[] = [];

        for (let i = 0; i < items.length * 2; i++) {
            tmpGrid.push({ item: null, show: false, permanentShow: false });
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
    //lógica para clicar no item do grid
    const handleItemClick = (index: number) => {
        if (playing && index !== null && showCount < 2) {
            let tmpGrid = [...gridItems];
            if (tmpGrid[index].permanentShow === false && tmpGrid[index].show === false) {
                tmpGrid[index].show = true;
                setShowCount(showCount + 1);
            }
            setGridItems(tmpGrid);
        }
    }

    useEffect(() => {
        resetAndCreateGrid();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (playing) {
                setTime((time) => time + 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [playing, time]);

    useEffect(() => {
        if (showCount === 2) {
            let opened = gridItems.filter(item => item.show === true);
            if (opened.length === 2) {
                //verificar se são iguais
                let tmpGrid = [...gridItems];

                if (opened[0].item === opened[1].item) {
                    let tmpGrid = [...gridItems];

                    for (let i in tmpGrid) {
                        if (tmpGrid[i].show === true) {
                            tmpGrid[i].permanentShow = true;
                            tmpGrid[i].show = false;
                        }
                    }
                    setGridItems(tmpGrid);
                    setShowCount(0);

                } else {

                    setTimeout(() => {
                        let tmpGrid = [...gridItems];
                        for (let i in tmpGrid) {
                            tmpGrid[i].show = false;
                        }
                        setGridItems(tmpGrid);
                        setShowCount(0);
                    }, 1000);

                }



                setMoves(moves => moves + 1);
            }

        }
    }, [showCount, gridItems]);

    useEffect(() => {
        if (moves > 0 && gridItems.every(item => item.permanentShow === true)) {
            setPlaying(false);
        }
    }, [moves, gridItems]);
    return (
        <div className="mx-auto flex w-screen max-w-[750px] py-[50px] max-[750px]:flex-col">
            <div className="flex flex-col max-[750px]:mb-[20px] max-[750px]:items-center ">
                <div className="flex items-center justify-start gap-2 rounded-2xl px-0 py-0 md:px-2 md:py-2 text-cyan-500 transition-colors duration-300 hover:bg-cyan-50 sm:gap-3 sm:px-3">
                    <Image
                        src={LogoImg}
                        alt="Logo do jogo da memória"
                        width={60}
                        className=" shrink-0 sm:h-10 sm:w-10"
                    />
                    <h1 className="md:max-w-[100px] max-w-[150px] text-3xl md:text-xl font-extrabold ">
                        Jogo da Memória
                    </h1>
                </div>

                <div className="my-[30px] w-full max-[750px]:flex max-[750px]:justify-around max-[750px]:text-center">
                    <InfoItem label="Tempo" value={`${formatTimeElapsed(time)}`} />
                    <InfoItem label="Movimentos" value={moves} />
                </div>
                <Button Icon={restart} onClick={resetAndCreateGrid} />
            </div>
            <div className="flex flex-1 justify-end max-[750px]:mx-[20px] max-[750px]:justify-center">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-2">
                    {gridItems.map((gridItem, index) => (
                        <GridItem
                            key={index}
                            item={gridItem}
                            onClick={() => handleItemClick(index)} />
                    ))}
                </div>
            </div>
            {hasWon && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
                        <h2 className="text-2xl font-bold text-cyan-600">vc ganhou</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Tempo: {formatTimeElapsed(time)} | Movimentos: {moves}
                        </p>
                        <button
                            onClick={resetAndCreateGrid}
                            className="mt-5 w-full cursor-pointer rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-cyan-600"
                        >
                            Jogar novamente
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
