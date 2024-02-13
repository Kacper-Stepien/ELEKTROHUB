import NavbarButtons from "./NavbarButtons";
import ProfileButton from "./ProfileButton";
import SwitchThemeButton from "../ui/SwitchThemeButton";

const NavbarMenu = () => {
  return (
    <div className="flex w-full max-w-2xl items-center justify-between gap-16">
      <ProfileButton />
      <NavbarButtons />
      <SwitchThemeButton />
    </div>
  );
};

export default NavbarMenu;
