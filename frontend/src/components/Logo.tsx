import LogoDark from "../assets/logo-dark.png";
import LogoLight from "../assets/logo-light.png";
import { useAppSelector } from "../store/store";

const Logo = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  if (theme === "dark") {
    return (
      <div>
        <img src={LogoLight} alt="Logo" className="max-w-[10rem]" />
      </div>
    );
  }

  return (
    <div>
      <img src={LogoDark} alt="Logo" className="max-w-[10rem]" />
    </div>
  );
};

export default Logo;
