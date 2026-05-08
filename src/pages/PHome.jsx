import { useEffect, useState, useContext } from "react";
import { BriefcaseMedical, AudioWaveform, ArrowRight } from "lucide-react";
import Search from "../components/Search";
import { getInfo } from "../services/user";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { AppContext } from "../context/AppContext";

const PHome = () => {
  const [info, setInfo] = useState(null);
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";
  
  const { userId, userName } = useSelector((state) => {
    return state.userSlice;
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await getInfo(userId);
    setInfo(data);
  };

  return (
    <div className={`p-6 md:p-8 w-full h-full overflow-x-hidden font-sans space-y-8 ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
      <Search title={tObj?.homeTitle || "Home"} />

      {/* Premium Hero Section */}
      <div className={`relative h-[40vh] min-h-[300px] rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-500 border ${dark ? 'border-gray-800 shadow-black/50' : 'border-gray-200 shadow-blue-500/10'}`}>
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?q=80&w=2000&auto=format&fit=crop"
          alt="Medical Background"
          className="absolute inset-0 h-full w-full object-cover z-0 mix-blend-overlay opacity-60 dark:opacity-40"
        />
        <div className={`absolute inset-0 z-0 ${dark ? 'bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent' : 'bg-gradient-to-r from-blue-50/95 via-blue-50/80 to-transparent'}`}></div>
        
        <div className="relative z-10 h-full w-full flex flex-col justify-center px-8 md:px-14">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest w-fit animate-fade-in-up">
            {tObj?.welcomeTag || "Welcome to eDoc"}
          </div>
          <h2 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${dark ? 'text-white' : 'text-blue-950'}`}>
            {tObj?.helloText || "Hello,"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">{userName || "User"}</span>
          </h2>
          <p className={`max-w-xl text-base md:text-lg leading-relaxed mb-6 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
            {tObj?.homeHeroDesc || "Not sure where to start? Explore All Doctors or check Sessions to track your appointments and arrival times."}
          </p>
          
          <Link
            to="/home/sessions"
            className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 w-fit transition-all hover:shadow-blue-500/50 hover:-translate-y-0.5"
          >
            {tObj?.viewSessionsBtn || "View Sessions"}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full">
        
        {/* Status Cards */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <h3 className="text-2xl font-bold tracking-tight">Status</h3>

          <div className={`group flex items-center justify-between p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${dark ? 'bg-gray-900 border-gray-800 hover:shadow-black/50' : 'bg-white border-gray-100 shadow-sm hover:shadow-gray-200/50'}`}>
            <div>
              <h4 className="text-3xl font-black mb-1">{info ? info.doctors : "0"}</h4>
              <p className={`text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{tObj?.allDoctorsTitle || "All Doctors"}</p>
            </div>
            <div className={`p-4 rounded-2xl transition-colors ${dark ? 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'}`}>
              <BriefcaseMedical size={32} />
            </div>
          </div>

          <div className={`group flex items-center justify-between p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${dark ? 'bg-gray-900 border-gray-800 hover:shadow-black/50' : 'bg-white border-gray-100 shadow-sm hover:shadow-gray-200/50'}`}>
            <div>
              <h4 className="text-3xl font-black mb-1">{info ? info.appointment : "0"}</h4>
              <p className={`text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{tObj?.navAppointment || "Appointments"}</p>
            </div>
            <div className={`p-4 rounded-2xl transition-colors ${dark ? 'bg-teal-500/20 text-teal-400 group-hover:bg-teal-500/30' : 'bg-teal-100 text-teal-600 group-hover:bg-teal-200'}`}>
              <AudioWaveform size={32} />
            </div>
          </div>
        </div>

        {/* Sessions Table */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <h3 className="text-2xl font-bold tracking-tight">{tObj?.navSessions || "All Sessions"}</h3>
          
          <div className={`overflow-hidden rounded-3xl border shadow-sm ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
            <div className="overflow-x-auto max-h-[400px] custom-scrollbar">
              <table className="min-w-full text-sm text-left">
                <thead className={`sticky top-0 z-10 backdrop-blur-md ${dark ? 'bg-gray-900/90 text-gray-400' : 'bg-gray-50/90 text-gray-500'}`}>
                  <tr>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Appoint. No.</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Session Title</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Doctor</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Date & Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {info?.appointments && info.appointments.length > 0 ? (
                    info.appointments.map((appointment, index) => (
                      <tr key={index} className={`transition-colors ${dark ? 'hover:bg-gray-800/50' : 'hover:bg-blue-50/50'}`}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">#{appointment.appointment}</td>
                        <td className="px-6 py-4 font-semibold">{appointment.tittle}</td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${dark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                 {appointment.doctor?.charAt(0).toUpperCase()}
                              </div>
                              {appointment.doctor}
                           </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${dark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            {new Date(appointment.date).toLocaleString(undefined, {
                               dateStyle: 'medium',
                               timeStyle: 'short'
                            })}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-12">
                        <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                          <AudioWaveform size={48} className="mb-4 opacity-20" />
                          <p className="text-lg font-medium">{tObj?.noSessionsText || "No Sessions found."}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PHome;
