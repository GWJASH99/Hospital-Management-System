import {
  Bookmark,
  CalendarDays,
  Settings,
  House,
  BriefcaseMedical,
  Menu,
  User2,
  Tablets,
  Sun,
  Moon,
  Globe,
  LogOut,
  X
} from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { aboutMe } from "../services/auth";
import { AppContext } from "../context/AppContext";

const UserLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const { theme, toggleTheme, lang, changeLanguage } = useContext(AppContext);
  const dark = theme === "dark";

  useEffect(() => {
    getUser();
  }, []);
  
  async function getUser() {
    let id = localStorage.getItem("id") || null;
    if (id) {
      id = JSON.parse(id);
    }
    let user = await aboutMe(id);
    setUser(user);
  }
  
  const logOut = () => {
    localStorage.clear("id");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={`w-screen h-screen flex overflow-hidden font-sans transition-colors duration-500 ${dark ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Mobile Topbar */}
      <div className={`md:hidden flex items-center justify-between px-6 py-4 border-b shadow-sm z-30 absolute top-0 left-0 w-full transition-colors ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">User Portal</h1>
        <button onClick={() => setShowSidebar(true)} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
          <Menu size={28} className={dark ? "text-gray-300" : "text-gray-700"} />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-500 ease-in-out md:relative md:translate-x-0 flex flex-col shadow-2xl ${dark ? 'bg-gray-900/95 border-r border-gray-800 backdrop-blur-xl' : 'bg-white/95 border-r border-gray-200 backdrop-blur-xl'} ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* Mobile Close Button */}
        <button onClick={() => setShowSidebar(false)} className={`md:hidden absolute top-4 right-4 p-2 rounded-full ${dark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
          <X size={20} />
        </button>

        <div className="p-6 flex-shrink-0">
          <div className="flex flex-col gap-5 p-6 rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-sm border border-white/30">
                <User2 size={32} className="text-white drop-shadow-md" />
              </div>
              <div className="overflow-hidden">
                <h2 className="text-xl font-bold truncate">{user?.userName || "User"}</h2>
                <h3 className="text-xs text-blue-100 truncate">{user?.userEmail || "Loading..."}</h3>
              </div>
            </div>
            <button
              onClick={logOut}
              className="relative z-10 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white py-2.5 rounded-xl font-semibold transition-all hover:shadow-lg active:scale-95 border border-white/20"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 custom-scrollbar">
          <p className={`px-4 text-xs font-bold uppercase tracking-wider mb-4 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Menu</p>
          {[
            { to: "main", icon: House, label: "Home" },
            { to: "sessions", icon: CalendarDays, label: "Sessions" },
            { to: "appointment", icon: Bookmark, label: "Appointment" },
            { to: "doctors", icon: BriefcaseMedical, label: "Doctors" },
            { to: "pharmesy", icon: Tablets, label: "Pharmacy" },
            { to: "setting", icon: Settings, label: "Setting" },
          ].map((item, idx) => (
            <NavLink
              key={idx}
              to={item.to}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md shadow-indigo-500/20 translate-x-1' : `hover:bg-gray-100 dark:hover:bg-gray-800 ${dark ? 'text-gray-300' : 'text-gray-600'} hover:translate-x-1`}`}
            >
              <item.icon size={20} className="shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className={`p-6 mt-auto border-t ${dark ? 'border-gray-800' : 'border-gray-200'}`}>
           <div className={`p-2 rounded-2xl flex justify-between items-center ${dark ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
              <div className="relative group flex items-center gap-2 pl-3 cursor-pointer text-sm font-semibold text-gray-600 dark:text-gray-300">
                <Globe size={18} className="text-blue-500" />
                <span>{lang}</span>
                <select
                  value={lang}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                >
                  <option value="EN">EN</option>
                  <option value="HI">HI</option>
                  <option value="PA">PA</option>
                </select>
              </div>

              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-xl transition-all ${dark ? 'bg-gray-700 hover:bg-gray-600 shadow-inner' : 'bg-white hover:bg-gray-200 shadow-sm'}`}
              >
                {dark ? <Sun size={18} className="text-yellow-400 animate-pulse"/> : <Moon size={18} className="text-slate-700" />}
              </button>
            </div>
        </div>
      </div>

      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden transition-opacity duration-500"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main Content Area */}
      <div className={`flex-1 overflow-y-auto z-10 pt-16 md:pt-0 relative ${dark ? 'bg-gray-950' : 'bg-gray-50'}`}>
         {/* Background Decor */}
         <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="p-6 md:p-10 min-h-full relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
