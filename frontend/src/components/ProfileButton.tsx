import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";

const ProfileButton = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => setIsHovering(true);

  const handleMouseOut = () => setIsHovering(false);

  return (
    <div
      className="text-sm dark:text-blue-100 flex items-center gap-2 hover:cursor-pointer group relative"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div>
        <p className="font-bold text-sm">Moje konto</p>
        <div className="col-start-1">Zaloguj/Zarejestruj</div>
      </div>
      <MdOutlineKeyboardArrowDown className="text-2xl group-hover:scale-110 group-hover:translate-x-4 transition-all" />
      {isHovering && (
        <ul className="absolute top-full text-gray-900 bg-blue-100 w-full rounded-md px-2 py-4 flex flex-col gap-2 shadow-md">
          <li>
            <Link to="/">Zamówienia</Link>
          </li>
          <li>
            <Link to="/">Paragony i faktury</Link>
          </li>
          <li>
            <Link to="/">Moje dane</Link>
          </li>
          <li>
            <Link to="/">Kupony rabatowe</Link>
          </li>
          <li>
            <Link to="/">Opinie</Link>
          </li>
          <li>
            <Link to="/">Reklamacje</Link>
          </li>
          <li>
            <Link to="/">Zwroty</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileButton;
