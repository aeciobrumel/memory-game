import Image from "next/image";
import { GridItemType } from "../types/GridItem";
import dadoSvg from "../assets/checkerboard-fill.svg";
import { items } from "../data/items";
type Props = {
  item: GridItemType;
  onClick: () => void;
};

export const GridItem = ({ item, onClick }: Props) => {
  const hasBackground = item.permanentShow || item.show;

  return (
    <div className="w-20 md:w-28 aspect-square [perspective:1000px] cursor-pointer"
      onClick={onClick}
    >

      <div
        className={`relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] ${hasBackground ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
          }`}
      >
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gray-300 [backface-visibility:hidden]">
          <Image src={dadoSvg} alt="Dado" width={60} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-cyan-500 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {item.item !== null && (
            <Image src={items[item.item].image}
              alt={items[item.item].name}
              width={60}
              className="brightness-0 invert"
            />
          )}
        </div>
      </div >
    </div>
  );
};
