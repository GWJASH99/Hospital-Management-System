import { useEffect, useState, useContext } from "react";
import Search from "../components/Search";
import { getAppointment } from "../services/admin";
import { AppContext } from "../context/AppContext";
import { Calendar, User, Hash, Clock, FileText } from "lucide-react";

const AdminAppointment = () => {
  const [appointments, setAppointments] = useState(null);
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";

  useEffect(() => {
    getAppointmentsData();
  }, []);

  const getAppointmentsData = async () => {
    const res = await getAppointment();
    setAppointments(res.appointment);
  };

  return (
    <div className={`p-6 md:p-10 font-sans space-y-8 h-full flex flex-col ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
      <Search title={tObj?.appointmentsTitle || "Appointments"} />

      <div className={`flex-1 overflow-hidden rounded-3xl border shadow-sm flex flex-col ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
        <div className="overflow-x-auto custom-scrollbar flex-1">
          <table className="min-w-full text-left border-collapse">
            <thead className={`sticky top-0 z-10 backdrop-blur-md ${dark ? 'bg-gray-900/90 text-gray-400' : 'bg-gray-50/90 text-gray-500'}`}>
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User size={14} /> {tObj?.colPatientName || "Patient Name"}
                  </div>
                </th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Hash size={14} /> {tObj?.colAppointmentNo || "Appointment No"}
                  </div>
                </th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User size={14} /> {tObj?.colDoctor || "Doctor"}
                  </div>
                </th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FileText size={14} /> {tObj?.colSession || "Session"}
                  </div>
                </th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Clock size={14} /> {tObj?.colTime || "Time"}
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className={`transition-colors duration-200 ${dark ? 'hover:bg-gray-800/50' : 'hover:bg-blue-50/50'}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {appointment.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${dark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                        #{appointment.appointment}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {appointment.doctor}
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      {appointment.tittle}
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
                  <td colSpan="5" className="text-center py-12">
                     <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                        <Calendar size={48} className="mb-4 opacity-20" />
                        <p className="text-lg font-medium">{tObj?.noAppointmentsText || "No appointments found."}</p>
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

export default AdminAppointment;
