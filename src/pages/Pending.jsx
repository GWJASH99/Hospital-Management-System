import Search from "../components/Search";
import { useEffect, useState, useContext } from "react";
import { getMedicine, givMedicines } from "../services/admin";
import { AppContext } from "../context/AppContext";
import { Pill, User, Clock, FileText, CheckCircle2, Package } from "lucide-react";

const Pending = () => {
  const [medicines, setMedicines] = useState(null);
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";

  useEffect(() => {
    getMedicineData();
  }, []);

  const getMedicineData = async () => {
    const res = await getMedicine();
    setMedicines(res.medicine);
  };

  const pendingMedicines = medicines?.filter(
    (medicine) => medicine.status === "ordered"
  );

  const handleGivBtn = async (userId) => {
    const res = await givMedicines(userId)
    alert(res.message);
    getMedicineData();
  };

  return (
    <div className={`p-6 md:p-10 font-sans space-y-8 min-h-full flex flex-col ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
      <Search title={tObj?.pendingOrdersTitle || "Pending Orders"} />
      
      <div className="py-2 flex-1">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pendingMedicines && pendingMedicines.length > 0 ? (
            pendingMedicines.map((medicine) => (
              <div
                key={medicine._id}
                className={`group flex flex-col justify-between p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden ${dark ? 'bg-gray-900 border-gray-800 hover:shadow-black/50 hover:border-orange-500/50' : 'bg-white border-gray-100 shadow-sm hover:shadow-orange-500/10 hover:border-orange-200'}`}
              >
                {/* Decorative Background Blob */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${dark ? 'bg-orange-500' : 'bg-orange-600'}`}></div>

                <div className="relative z-10 space-y-4 flex-1">
                  <div className="flex justify-between items-start">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${dark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-700'}`}>
                        {medicine.status}
                     </span>
                     <span className={`text-xs font-medium ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                       {new Date(medicine.createdAt).toLocaleDateString()}
                     </span>
                  </div>

                  <h2 className="text-2xl font-black tracking-tight text-orange-600 dark:text-orange-400 line-clamp-2">
                    {medicine.userName}
                  </h2>

                  <div className={`space-y-3 text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="flex items-center gap-2">
                      <User size={16} className={dark ? 'text-gray-500' : 'text-gray-400'} />
                      <span className="font-semibold">{tObj?.colDoctor || "Doctor"}:</span> {medicine.doctorName}
                    </div>
                    <div className="flex items-start gap-2">
                      <Pill size={16} className={`mt-0.5 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <div>
                        <span className="font-semibold">{tObj?.colMedicine || "Medicine"}:</span> 
                        <p className="mt-1 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg text-xs leading-relaxed border dark:border-gray-800">{medicine.medicine}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className={dark ? 'text-gray-500' : 'text-gray-400'} />
                      <span className="font-semibold">{tObj?.colDate || "Date"}:</span> {new Date(medicine.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                  </div>
                </div>

                {medicine?.status === 'ordered' && (
                  <button
                    onClick={() => handleGivBtn(medicine._id)}
                    className="relative z-10 w-full mt-6 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white shadow-md shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5"
                  >
                    <CheckCircle2 size={18} />
                    {tObj?.giveBtn || "Give Medicine"}
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-3xl dark:border-gray-800 border-gray-200 h-full">
               <Package size={64} className="mb-4 opacity-20" />
               <h3 className="text-xl font-semibold">{tObj?.noRecordsFoundText || "No Pending Orders Found."}</h3>
               <p className="mt-2 text-sm max-w-sm text-center">All orders have been processed or no new orders are available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pending;
