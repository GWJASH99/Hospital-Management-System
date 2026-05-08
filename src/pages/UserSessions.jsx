import { Plus, User, Clock, FileText, Calendar, CheckCircle2 } from "lucide-react";
import Search from "../components/Search";
import { useEffect, useState, useContext } from "react";
import { getSessions } from "../services/admin";
import { makeAppointment } from "../services/user";
import { useSelector } from "react-redux";
import { AppContext } from "../context/AppContext";

const UserSessions = () => {
  const [sessions, setSessions] = useState(null);
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";

  const { userId } = useSelector((state) => {
    return state.userSlice;
  });

  useEffect(() => {
    getSessionData();
  }, []);

  const getSessionData = async () => {
    const res = await getSessions();
    setSessions(res.sessions);
  };

  const handleBookBtn = async (sessionId) => {
    const res = await makeAppointment({ sessionId, userId });
    alert(res.message);
    getSessionData();
  };

  return (
    <div className={`p-6 md:p-10 font-sans space-y-8 min-h-full ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
      <Search title={tObj?.navSessions || "Sessions"} />
      
      <div className="py-2">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sessions && sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session._id}
                className={`group flex flex-col justify-between p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden ${dark ? 'bg-gray-900 border-gray-800 hover:shadow-black/50 hover:border-blue-500/50' : 'bg-white border-gray-100 shadow-sm hover:shadow-blue-500/10 hover:border-blue-200'}`}
              >
                {/* Decorative Background Blob */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${dark ? 'bg-blue-500' : 'bg-blue-600'}`}></div>

                <div className="relative z-10 space-y-4 flex-1">
                  <div className="flex justify-between items-start">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${session.leftSlot > 0 ? (dark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700') : (dark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700')}`}>
                        {session.leftSlot} {tObj?.colSlots || "Slots Left"}
                     </span>
                  </div>

                  <h2 className="text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400 line-clamp-2">
                    {session.tittle}
                  </h2>

                  <div className={`space-y-2 text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="flex items-center gap-2">
                      <User size={16} className={dark ? 'text-gray-500' : 'text-gray-400'} />
                      <span className="font-semibold">{tObj?.colDoctor || "Doctor"}:</span> {session.doctor}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className={dark ? 'text-gray-500' : 'text-gray-400'} />
                      <span className="font-semibold">{tObj?.colTime || "Date"}:</span> {new Date(session.date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleBookBtn(session._id)}
                  disabled={session.leftSlot === 0}
                  className={`relative z-10 w-full mt-6 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold transition-all duration-300 ${session.leftSlot === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600' : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5'}`}
                >
                  <CheckCircle2 size={18} />
                  {session.leftSlot === 0 ? "Fully Booked" : tObj?.bookSessionBtn || "Book Session"}
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-3xl dark:border-gray-800 border-gray-200">
               <Calendar size={64} className="mb-4 opacity-20" />
               <h3 className="text-xl font-semibold">{tObj?.noSessionsText || "No Sessions found."}</h3>
               <p className="mt-2 text-sm max-w-sm text-center">There are currently no sessions available to book. Please check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSessions;
