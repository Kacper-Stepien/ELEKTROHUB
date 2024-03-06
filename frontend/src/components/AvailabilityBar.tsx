import { FC } from "react";

interface AvailabilityBarProps {
  stock: number;
  total: number;
}

const AvailabilityBar: FC<AvailabilityBarProps> = ({ stock, total }) => {
  const isAvailable = stock > 0;

  let percent = (stock / total) * 100;
  percent = percent > 100 ? 100 : percent;
  const color =
    percent > 60
      ? "bg-green-500"
      : percent > 20
        ? "bg-yellow-300"
        : "bg-red-500";
  return (
    <div className="flex-col items-center gap-2">
      <span className="text-sm">
        {isAvailable ? "Dostępność" : "Niedostępne"}
      </span>
      <div className="h-2 w-full rounded-lg bg-gray-200">
        <div
          style={{ width: `${percent}%` }}
          className={`h-full rounded-lg ${color}`}
        ></div>
      </div>
    </div>
  );
};

export default AvailabilityBar;
