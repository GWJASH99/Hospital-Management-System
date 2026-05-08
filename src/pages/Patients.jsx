import Search from "../components/Search";
import AddDoctorForm from "../components/AddDoctorForm";
import { useEffect, useState, useContext } from "react";
import { deleteUser, getPatients } from "../services/admin";
import { AppContext } from "../context/AppContext";
import { Users, Mail, User, Trash2 } from "lucide-react";

const Patients = () => {
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [patients, setPatients] = useState(null);
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";

  useEffect(() => {
    getDoctorsData();
  }, []);

  const getDoctorsData = async () => {
    const data = await getPatients();
    setPatients(data.users);
  };

  const handleDelete = async (id) => {
    const res = await deleteUser(id);
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

      <Search title={tObj?.allPatientsTitle || "All Patients"} />

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
                    <Mail size={14} /> {tObj?.colEmail || "Email"}
                  </div>
                </th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right whitespace-nowrap">
                  {tObj?.colActions || "Actions"}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {patients && patients.length > 0 ? (
                patients.map((patient) => (
                  <tr
                    key={patient._id}
                    className={`transition-colors duration-200 ${dark ? 'hover:bg-gray-800/50' : 'hover:bg-blue-50/50'}`}
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-3">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${dark ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' : 'bg-gradient-to-br from-blue-100 to-indigo-200 text-blue-700'}`}>
                            {patient.userName?.charAt(0).toUpperCase()}
                         </div>
                         <span className="text-base">{patient.userName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {patient.userEmail}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(patient._id)}
                        className={`inline-flex items-center justify-center p-2.5 rounded-xl transition-all ${dark ? 'text-gray-400 hover:bg-red-500/20 hover:text-red-400' : 'text-gray-500 hover:bg-red-50 hover:text-red-600'}`}
                        title="Remove Patient"
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
                        <Users size={64} className="mb-4 opacity-20" />
                        <p className="text-lg font-medium">{tObj?.noPatientsText || "No Patients found."}</p>
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

export default Patients;
