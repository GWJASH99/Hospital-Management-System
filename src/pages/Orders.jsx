import Search from "../components/Search";
import { useEffect, useState, useContext } from "react";
import { getMedicine } from "../services/admin";
import { AppContext } from "../context/AppContext";
import { Pill, User, Clock, FileText, ShoppingBag } from "lucide-react";

const Orders = () => {
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

  return (
    <div className={`p-6 md:p-10 font-sans space-y-8 min-h-full flex flex-col ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
      <Search title={tObj?.allOrdersTitle || "All Orders"} />
      
      <div className="py-2 flex-1">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {medicines && medicines.length > 0 ? (
            medicines.map((medicine) => (
              <div
                key={medicine._id}
                className={`group flex flex-col justify-between p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden ${dark ? 'bg-gray-900 border-gray-800 hover:shadow-black/50 hover:border-blue-500/50' : 'bg-white border-gray-100 shadow-sm hover:shadow-blue-500/10 hover:border-blue-200'}`}
              >
                {/* Decorative Background Blob */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${dark ? 'bg-blue-500' : 'bg-blue-600'}`}></div>

                <div className="relative z-10 space-y-4 flex-1">
                  <div className="flex justify-between items-start">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${medicine.status === 'Completed' || medicine.status === 'completed' ? (dark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700') : medicine.status === 'Pending' || medicine.status === 'ordered' ? (dark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700') : (dark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700')}`}>
                        {medicine.status}
                     </span>
                     <span className={`text-xs font-medium ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                       {new Date(medicine.createdAt).toLocaleDateString()}
                     </span>
                  </div>

                  <h2 className="text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400 line-clamp-2">
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
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-3xl dark:border-gray-800 border-gray-200 h-full">
               <ShoppingBag size={64} className="mb-4 opacity-20" />
               <h3 className="text-xl font-semibold">{tObj?.noRecordsFoundText || "No Orders Found."}</h3>
               <p className="mt-2 text-sm max-w-sm text-center">There are no medicine orders available in the system.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
