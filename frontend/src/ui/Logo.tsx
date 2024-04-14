import LogoDark from "../assets/logo-dark.png";
import LogoLight from "../assets/logo-light.png";
import { useAppSelector } from "../store/store";
import { NavLink } from "react-router-dom";

const Logo = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  console.log(theme);
  const logoImage = theme === "dark" ? LogoDark : LogoLight;

  return (
    <NavLink className="cursor-pointer transition-all hover:scale-110" to="/">
      <img src={logoImage} id="Logo" alt="Logo" className="w-full" />
    </NavLink>
  );
};

export default Logo;
