type Props = {
    label: string;
    value: string | number;
}

export const InfoItem = ({ label, value }: Props) => {
    return (
        <div className="flex flex-col items-start justify-content-center text-center">
            <div className="text-black/70">{label}</div>
            <div className="text-4xl font-bold">{value}</div>
        </div>
    );
};

