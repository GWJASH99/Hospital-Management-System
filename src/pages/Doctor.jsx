import { Plus, User, Mail, Trash2, Stethoscope, UserPlus2 } from "lucide-react";
import Search from "../components/Search";
import AddDoctorForm from "../components/AddDoctorForm";
import { useEffect, useState, useContext } from "react";
import { getDoctors, deleteDoctor } from "../services/admin";
import { AppContext } from "../context/AppContext";

const Doctor = () => {
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [doctors, setDoctors] = useState(null);
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";

  useEffect(() => {
    getDoctorsData();
  }, []);

  const getDoctorsData = async () => {
    const data = await getDoctors();
    setDoctors(data.doctors);
  };

  const handleDelete = async (id) => {
    const res = await deleteDoctor(id);
    alert(res.message);
    getDoctorsData();
  };

  return (
    <div className={`p-6 md:p-10 font-sans space-y-8 h-full flex flex-col ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
      {showAddDoctor && (
        <AddDoctorForm
          showForm={showAddDoctor}
          setShowForm={setShowAddDoctor}
          refreshFunction={getDoctorsData}
        />
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex-1">
           <Search title={tObj?.doctorsTitle || "Medical Staff"} />
        </div>
        <button
          onClick={() => setShowAddDoctor(true)}
          className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
        >
          <UserPlus2 size={20} className="group-hover:rotate-12 transition-transform" />
          {tObj?.addNewDoctorBtn || "Add New Doctor"}
        </button>
      </div>

      <div className={`flex-1 overflow-hidden rounded-3xl border shadow-sm flex flex-col ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
        <div className="overflow-x-auto custom-scrollbar flex-1">
          <table className="min-w-full text-left border-collapse">
            <thead className={`sticky top-0 z-10 backdrop-blur-md ${dark ? 'bg-gray-900/90 text-gray-400' : 'bg-gray-50/90 text-gray-500'}`}>
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User size={14} /> {tObj?.colDoctorName || "Doctor Name"}
                  </div>
                </th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Mail size={14} /> {tObj?.colEmail || "Email"}
                  </div>
                </th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right whitespace-nowrap">
                  {tObj?.colActions || "Actions"}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {doctors && doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <tr
                    key={doctor._id}
                    className={`transition-colors duration-200 ${dark ? 'hover:bg-gray-800/50' : 'hover:bg-blue-50/50'}`}
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-3">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${dark ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' : 'bg-gradient-to-br from-indigo-100 to-purple-200 text-indigo-700'}`}>
                            {doctor.userName?.charAt(0).toUpperCase()}
                         </div>
                         <div className="flex flex-col">
                            <span className="text-base font-bold">{doctor.userName}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Specialist Doctor</span>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {doctor.userEmail}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(doctor._id)}
                        className={`inline-flex items-center justify-center p-2.5 rounded-xl transition-all ${dark ? 'text-gray-400 hover:bg-red-500/20 hover:text-red-400' : 'text-gray-500 hover:bg-red-50 hover:text-red-600'}`}
                        title="Remove Doctor"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-16">
                     <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                        <Stethoscope size={64} className="mb-4 opacity-20" />
                        <p className="text-lg font-medium">{tObj?.noDoctorsText || "No doctors found."}</p>
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

export default Doctor;
