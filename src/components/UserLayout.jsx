import { Bookmark, BriefcaseMedical, Accessibility, LayoutDashboard, AlarmClock, Sun, Moon, Globe } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const UserLayout = ({children}) => {
  const { theme, toggleTheme, lang, changeLanguage } = useContext(AppContext);
  const dark = theme === "dark";

  return (
    <div className={`w-screen min-h-screen flex font-sans transition-colors duration-500 ${dark ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        <div className={`w-1/4 h-screen border-r shadow-xl transition-all duration-300 ${dark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
          <div className="p-5 w-full flex flex-col h-full">
            
            {/* Header / Profile */}
            <div className="flex flex-col gap-5 p-6 rounded-2xl bg-gradient-to-b from-blue-500/10 to-transparent">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img src="/user.png" className="w-16 h-16 rounded-full border-2 border-blue-500 object-cover shadow-lg" alt="Profile" onError={(e) => e.target.src = "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"} />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Administrator</h2>
                  <h3 className="text-sm text-gray-500 dark:text-gray-400">admin@gmail.com</h3>
                </div>
              </div>
              <div className="w-full text-center mt-2">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition-all shadow-md hover:shadow-blue-500/30 active:scale-95">
                  Logout
                </button>
              </div>
            </div>

            <hr className={`my-6 ${dark ? 'border-gray-800' : 'border-gray-200'}`} />

            {/* Navigation Menu */}
            <div className="flex-1 flex flex-col font-medium gap-3 px-2 overflow-y-auto">
              {[
                { name: 'Dashboard', icon: LayoutDashboard, active: false },
                { name: 'Doctor', icon: BriefcaseMedical, active: true },
                { name: 'Schedule', icon: AlarmClock, active: false },
                { name: 'Appointment', icon: Bookmark, active: false },
                { name: 'Patients', icon: Accessibility, active: false },
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${item.active ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>

            {/* Settings Toggles */}
            <div className={`mt-auto p-4 rounded-xl flex justify-between items-center ${dark ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
              <div className="relative group flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-600 dark:text-gray-300">
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
                className={`p-2 rounded-full transition-all ${dark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-200 shadow-sm'}`}
              >
                {dark ? <Sun size={18} className="text-yellow-400"/> : <Moon size={18} className="text-slate-700" />}
              </button>
            </div>
          </div>
        </div>

        <div className="w-3/4 h-screen overflow-y-auto bg-gray-50/50 dark:bg-gray-950/50">
          {children}
        </div>
      </div>
  )
}

export default UserLayout;
