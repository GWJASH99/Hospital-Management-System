import Search from "../components/Search";
import { useEffect, useState, useContext } from "react";
import { deleteAppointments, getAppointments } from "../services/user";
import { useSelector } from "react-redux";
import { AppContext } from "../context/AppContext";
import { Calendar, Hash, Clock, FileText, User, Trash2 } from "lucide-react";

const UserAppointment = () => {
  const [appointments, setAppointments] = useState(null);
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";

  const { userId } = useSelector((state) => {
    return state.userSlice;
  });

  useEffect(() => {
    getAppointmentsData();
  }, []);

  const getAppointmentsData = async () => {
    const res = await getAppointments(userId);
    setAppointments(res.appointments);
  };

  const handleCancel = async (id) => {
    const res = await deleteAppointments(id);
    alert(res.message);
    getAppointmentsData();
  };

  return (
    <div className={`p-6 md:p-10 font-sans space-y-8 min-h-full ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
      <Search title={tObj?.appointmentsTitle || "Appointments"} />
      
      <div className="py-2">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment._id}
                className={`group flex flex-col justify-between p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden ${dark ? 'bg-gray-900 border-gray-800 hover:shadow-black/50 hover:border-blue-500/50' : 'bg-white border-gray-100 shadow-sm hover:shadow-blue-500/10 hover:border-blue-200'}`}
              >
                {/* Decorative Background Blob */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${dark ? 'bg-blue-500' : 'bg-blue-600'}`}></div>

                <div className="relative z-10 space-y-4 flex-1">
                  <div className="flex justify-between items-start">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${dark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                       #{appointment.appointment}
                     </span>
                     <span className={`text-xs font-medium ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                       {new Date(appointment.createdAt).toLocaleDateString()}
                     </span>
                  </div>

                  <h2 className="text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400 line-clamp-2">
                    {appointment.tittle}
                  </h2>

                  <div className={`space-y-2 text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="flex items-center gap-2">
                      <User size={16} className={dark ? 'text-gray-500' : 'text-gray-400'} />
                      <span className="font-semibold">{tObj?.colDoctor || "Doctor"}:</span> {appointment.doctor}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className={dark ? 'text-gray-500' : 'text-gray-400'} />
                      <span className="font-semibold">{tObj?.colTime || "Time"}:</span> {new Date(appointment.date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleCancel(appointment._id)}
                  className={`relative z-10 w-full mt-6 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold transition-all duration-300 ${dark ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-red-50 text-red-600 hover:bg-red-500 hover:text-white'}`}
                >
                  <Trash2 size={18} />
                  {tObj?.cancelBookingBtn || "Cancel Booking"}
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-3xl dark:border-gray-800 border-gray-200">
               <Calendar size={64} className="mb-4 opacity-20" />
               <h3 className="text-xl font-semibold">{tObj?.noAppointmentsText || "No Appointments found."}</h3>
               <p className="mt-2 text-sm max-w-sm text-center">You haven't booked any sessions yet. Check out the available sessions to book one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAppointment;
