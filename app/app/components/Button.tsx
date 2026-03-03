import Image, { StaticImageData } from "next/image";

type Props = {
    Icon: StaticImageData;
    onClick: () => void;
}
export const Button = ({ Icon, onClick }: Props) => {

    return (
        <div>
            <button
                onClick={onClick}
                className="flex w-[200px]  transition-all duration-300 ease-in-out hover:bg-cyan-500/70 items-center cursor-pointer gap-2 bg-cyan-500 text-white rounded-xl p-2" >
                <div className="border-r-white border-r-1 pr-2 ">
                    <Image src={Icon} alt="Restart" width={20} height={20} />
                </div>
                <div className="flex-1 justify-center">Reiniciar</div>
            </button>
        </div >
    );
}