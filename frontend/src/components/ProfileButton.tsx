import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import { useState } from "react";

const ProfileButton = () => {
  const { _id, name } = useLoggedInUser();
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => setIsHovering(true);

  const handleMouseOut = () => setIsHovering(false);

  return (
    <div
      className=" group relative flex items-center gap-2 hover:cursor-pointer dark:text-blue-100"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div>
        <p className="text-md font-bold">Moje konto</p>

        <div className="col-start-1 text-sm">
          {_id && name ? `Witaj ${name}` : "Zaloguj/Zarejestruj"}
        </div>
      </div>
      <MdOutlineKeyboardArrowDown className="text-2xl transition-all group-hover:translate-x-4 group-hover:scale-110" />
      {isHovering && (
        <ul className="absolute top-full flex w-full flex-col gap-2 rounded-md bg-blue-50 px-2 py-4 text-sm text-gray-900 shadow-md">
          <li className="transition hover:underline">
            <Link to="/">Zamówienia</Link>
          </li>
          <li className="transition hover:underline">
            <Link to="/">Paragony i faktury</Link>
          </li>
          <li className="transition hover:underline">
            <Link to="/">Moje dane</Link>
          </li>
          <li className="transition hover:underline">
            <Link to="/">Kupony rabatowe</Link>
          </li>
          <li className="transition hover:underline">
            <Link to="/">Opinie</Link>
          </li>
          <li className="transition hover:underline">
            <Link to="/">Reklamacje</Link>
          </li>
          <li className="transition hover:underline">
            <Link to="/">Zwroty</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileButton;
