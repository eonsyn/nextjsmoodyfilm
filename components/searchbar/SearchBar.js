import { IoIosSearch } from "react-icons/io";
import { useSearch } from "@/context/SearchContext";

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="search h-12 w-full bg-white/20 backdrop-blur-lg shadow-lg text-white rounded-lg flex items-center px-4 border border-white/20">
      {/* Search Icon */}
      <div className="icon-search w-12 flex items-center justify-center">
        <IoIosSearch className="text-2xl text-gray-300" />
      </div>

      {/* Input Field */}
      <div className="input-bar flex-grow">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
