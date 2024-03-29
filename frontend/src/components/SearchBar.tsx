import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="rounded-md bg-gray-200 flex items-center justify-between border-solid border-1 border-gray-200 max-w-md w-full">
      <input
        type="text"
        placeholder="Wyszukaj w sklepie"
        className="bg-gray-200 grow focus:outline-none py-2 px-4  rounded-md  focus:ring-blue-500 focus:ring-2 text-sm"
      />
      <button className="hover:scale-125 focus:outline-none transition ease-in-out py-2 px-4  text-md ">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
