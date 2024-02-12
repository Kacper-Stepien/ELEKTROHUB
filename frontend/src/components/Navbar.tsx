import Logo from "../ui/Logo";
import NavbarMenu from "./NavbarMenu";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between gap-8 px-4 py-2 md:px-8 md:py-4 text-md 3xl:text-xl">
      <div className="min-w-[6rem] max-w-[10rem]">
        <Logo />
      </div>
      <SearchBar />
      <NavbarMenu />
    </nav>
  );
};

export default Navbar;
``;
