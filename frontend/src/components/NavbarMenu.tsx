import NavbarButtons from "./NavbarButtons";
import ProfileButton from "./ProfileButton";
import SwitchThemeButton from "../ui/SwitchThemeButton";

const NavbarMenu = () => {
  return (
    <div className="flex items-center justify-between gap-16  w-full max-w-2xl">
      <ProfileButton />
      <NavbarButtons />
      <SwitchThemeButton />
    </div>
  );
};

export default NavbarMenu;
