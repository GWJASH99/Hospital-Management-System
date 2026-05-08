import { useState, useEffect, useContext } from "react";
import { CalendarDays, Search as SearchIcon } from "lucide-react";
import { AppContext } from "../context/AppContext";

const Search = ({ title }) => {
  const [date, setDate] = useState("");
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";

  useEffect(() => {
    setDate(new Date().toDateString());
  }, []);

  return (
    <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 p-6 rounded-2xl shadow-sm border transition-all duration-300 ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
      <div className="w-full sm:w-auto">
        {title ? (
          <h2 className={`text-2xl font-black tracking-tight ${dark ? 'text-white' : 'text-gray-800'}`}>{title}</h2>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Optional: handle search action here
            }}
            className="flex flex-col sm:flex-row items-center gap-3 w-full"
          >
            <div className={`relative flex items-center w-full sm:w-[35vw] border rounded-xl overflow-hidden transition-all duration-300 ${dark ? 'border-gray-700 bg-gray-800 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500' : 'border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500'}`}>
              <div className="pl-4 text-gray-400">
                <SearchIcon size={18} />
              </div>
              <input
                type="text"
                name="search"
                aria-label="Search doctor"
                placeholder={tObj?.searchPlaceholder || "Search doctor name or email"}
                className={`w-full px-4 py-2.5 outline-none bg-transparent text-sm ${dark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
            >
              {tObj?.searchBtn || "Search"}
            </button>
          </form>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className={`text-xs uppercase tracking-wider font-semibold ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Today's Date</p>
          <p className={`text-sm font-bold ${dark ? 'text-gray-200' : 'text-gray-800'}`}>{date}</p>
        </div>
        <div className={`p-3.5 rounded-2xl shadow-inner ${dark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'}`}>
          <CalendarDays size={24} className={dark ? 'text-blue-400' : 'text-blue-600'} />
        </div>
      </div>
    </div>
  );
};

export default Search;
