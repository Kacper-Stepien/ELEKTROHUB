import Logo from "../components/Logo";
import NavbarMenu from "../components/NavbarMenu";
import SearchBar from "../components/SearchBar";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between gap-8 px-4 py-2 md:px-8 md:py-6">
      <Logo />
      <SearchBar />
      <NavbarMenu />
    </nav>
  );
};

export default Navbar;
