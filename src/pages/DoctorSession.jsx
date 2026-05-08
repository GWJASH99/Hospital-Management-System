import { useState, useEffect, useContext } from "react";
import { Plus, Trash2, Calendar, User, Clock, FileText, CheckCircle2 } from "lucide-react";
import { deleteSessions, getDoctorSessions } from "../services/admin";
import { useSelector } from "react-redux";
import AddSessionForm2 from "../components/AddSessionForm2";
import { AppContext } from "../context/AppContext";

const DoctorSession = () => {
  const [showAddSession, setShowSession] = useState(false);
  const { userId } = useSelector((state) => {
    return state.userSlice;
  });
  const [sessions, setSessions] = useState(null);
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";

  useEffect(() => {
    getSessionData();
  }, []);

  const getSessionData = async () => {
    const res = await getDoctorSessions(userId);
    setSessions(res.sessions);
  };

  const handleDelete = async (id) => {
    const res = await deleteSessions(id);
    alert(res.message);
    getSessionData();
  };

  return (
    <div className={`p-6 md:p-10 font-sans space-y-8 h-full flex flex-col ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
      {showAddSession && (
        <AddSessionForm2
          showForm={showAddSession}
          setShowForm={setShowSession}
          refreshFunction={getSessionData}
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className={`text-3xl font-black tracking-tight ${dark ? 'text-white' : 'text-gray-800'}`}>
          {tObj?.navSessions || "All Sessions"}
        </h2>
        <button
          onClick={() => setShowSession(true)}
          className="group flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-md shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          {tObj?.addNewBtn || "Add New"}
        </button>
      </div>

      <div className={`flex-1 overflow-hidden rounded-3xl border shadow-sm flex flex-col ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
        <div className="overflow-x-auto custom-scrollbar flex-1">
          <table className="min-w-full text-left border-collapse">
            <thead className={`sticky top-0 z-10 backdrop-blur-md ${dark ? 'bg-gray-900/90 text-gray-400' : 'bg-gray-50/90 text-gray-500'}`}>
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FileText size={14} /> {tObj?.colTitle || "Title"}
                  </div>
                </th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User size={14} /> {tObj?.colDoctor || "Doctor"}
                  </div>
                </th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Clock size={14} /> {tObj?.colTime || "Date & Time"}
                  </div>
                </th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} /> {tObj?.colSlots || "Slots Left"}
                  </div>
                </th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right whitespace-nowrap">
                  {tObj?.colActions || "Actions"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {sessions && sessions.length > 0 ? (
                sessions.map((session) => (
                  <tr
                    key={session._id}
                    className={`transition-colors duration-200 ${dark ? 'hover:bg-gray-800/50' : 'hover:bg-teal-50/50'}`}
                  >
                    <td className="px-6 py-4 font-semibold text-teal-600 dark:text-teal-400">
                      {session.tittle}
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-3">
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${dark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            {session.doctor?.charAt(0).toUpperCase()}
                         </div>
                         {session.doctor}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${dark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                         {new Date(session.date).toLocaleString(undefined, {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                         })}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${session.leftSlot > 0 ? (dark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700') : (dark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700')}`}>
                         {session.leftSlot}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(session._id)}
                        className={`inline-flex items-center justify-center p-2 rounded-xl transition-all ${dark ? 'text-gray-400 hover:bg-red-500/20 hover:text-red-400' : 'text-gray-500 hover:bg-red-50 hover:text-red-600'}`}
                        title="Remove"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-12">
                     <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                        <Calendar size={48} className="mb-4 opacity-20" />
                        <p className="text-lg font-medium">{tObj?.noSessionsText || "No sessions found."}</p>
                     </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorSession;
