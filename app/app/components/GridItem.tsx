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
    <div
      className={`w-35 h-35 ${hasBackground ? "bg-cyan-500" : "bg-gray-300"} flex justify-center items-center rounded-2xl`}
      onClick={onClick}
    >
      {!item.permanentShow && !item.show && (
        <div className="brightness-2 invert">
          <Image src={dadoSvg} alt="Dado" width={60} className="brightness" />
        </div>
      )}
      {(item.permanentShow || item.show) && item.item !== null && (
        <div className="text-2xl font-bold text-white">
          <Image src={items[item.item].image} alt={items[item.item].name} width={60} className="brightness-0 invert" />
        </div>
      )}
    </div>
  );
};
