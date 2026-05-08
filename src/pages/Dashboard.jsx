import {
  BriefcaseMedical,
  Accessibility,
  Bookmark,
  AudioWaveform,
} from "lucide-react";
import Search from "../components/Search";
import { useEffect, useState, useContext } from "react";
import { getInfo } from "../services/admin";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const [info, setInfo] = useState(null);
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await getInfo();
    setInfo(data);
  };

  const statCards = [
    { title: "Doctors", value: info?.doctors || "0", icon: BriefcaseMedical, color: "blue" },
    { title: "Patients", value: info?.patients || "0", icon: Accessibility, color: "green" },
    { title: "New Bookings", value: info?.appointment || "0", icon: Bookmark, color: "purple" },
    { title: "Sessions", value: info?.sessions || "0", icon: AudioWaveform, color: "orange" },
  ];

  return (
    <div className={`p-6 md:p-8 space-y-8 font-sans ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
      <Search title={tObj?.dashboardTitle || "Dashboard"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const isBlue = stat.color === "blue";
          const isGreen = stat.color === "green";
          const isPurple = stat.color === "purple";
          const isOrange = stat.color === "orange";

          let iconBgLight = "";
          let iconTextLight = "";
          let iconBgDark = "";
          let iconTextDark = "";
          
          if (isBlue) {
            iconBgLight = "bg-blue-100"; iconTextLight = "text-blue-600";
            iconBgDark = "bg-blue-500/20"; iconTextDark = "text-blue-400";
          } else if (isGreen) {
            iconBgLight = "bg-green-100"; iconTextLight = "text-green-600";
            iconBgDark = "bg-green-500/20"; iconTextDark = "text-green-400";
          } else if (isPurple) {
            iconBgLight = "bg-purple-100"; iconTextLight = "text-purple-600";
            iconBgDark = "bg-purple-500/20"; iconTextDark = "text-purple-400";
          } else if (isOrange) {
            iconBgLight = "bg-orange-100"; iconTextLight = "text-orange-600";
            iconBgDark = "bg-orange-500/20"; iconTextDark = "text-orange-400";
          }

          return (
            <div key={idx} className={`relative overflow-hidden group flex items-center justify-between p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${dark ? 'bg-gray-900 border border-gray-800 hover:shadow-black/50' : 'bg-white border border-gray-100 shadow-sm hover:shadow-gray-200/50'}`}>
              <div className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${isBlue ? 'bg-blue-500' : isGreen ? 'bg-green-500' : isPurple ? 'bg-purple-500' : 'bg-orange-500'}`}></div>
              
              <div className="relative z-10">
                <h4 className="text-4xl font-black mb-1">{stat.value}</h4>
                <p className={`text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.title}</p>
              </div>
              <div className={`relative z-10 p-4 rounded-2xl transition-colors ${dark ? iconBgDark : iconBgLight}`}>
                <stat.icon size={32} className={dark ? iconTextDark : iconTextLight} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
