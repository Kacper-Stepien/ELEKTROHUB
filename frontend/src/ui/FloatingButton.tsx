import { FC, ReactNode, useState } from "react";

interface FloatingButtonProps {
  icon: ReactNode;
  name: string;
  itemCount: number;
  children: ReactNode;
}

const FloatingButton: FC<FloatingButtonProps> = ({
  icon,
  name,
  itemCount,
  children,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    if (itemCount > 0) {
      setIsHovering(true);
    }
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      className="group relative"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <button className="btn flex flex-col items-center text-2xl text-blue-950 transition-all group-hover:scale-110 dark:text-blue-100">
        {icon}
        <p className="text-sm">{name}</p>
        {itemCount > 0 && (
          <div className=" absolute  bottom-7 left-7 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-blue-50 transition-all group-hover:ring-2 group-hover:ring-green-300 dark:text-blue-900 2xl:h-6 2xl:w-6">
            {itemCount}
          </div>
        )}
      </button>
      {isHovering && itemCount > 0 && (
        <div className="absolute right-[-20px] top-full max-h-96 w-[30rem] overflow-y-auto rounded-md  bg-white p-4 text-sm shadow-md dark:bg-primaryDark">
          {children}
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
