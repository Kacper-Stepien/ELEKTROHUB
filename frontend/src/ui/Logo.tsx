import LogoDark from "../assets/logo-dark.png";
import LogoLight from "../assets/logo-light.png";
import { useAppSelector } from "../store/store";

const Logo = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  console.log(theme);
  const logoImage = theme === "dark" ? LogoDark : LogoLight;

  return (
    <div className="hover:scale-110 transition-all cursor-pointer">
      <img src={logoImage} id="Logo" alt="Logo" className="w-full" />
    </div>
  );
};

export default Logo;
