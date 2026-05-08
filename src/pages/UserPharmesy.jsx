import Search from "../components/Search";
import { useEffect, useState, useContext } from "react";
import { buyMedicines, getMedicine } from "../services/user";
import { useSelector } from "react-redux";
import { AppContext } from "../context/AppContext";
import { Pill, User, Clock, FileText, ShoppingCart, CheckCircle2, Download } from "lucide-react";
import jsPDF from "jspdf";

const UserPharmesy = () => {
  const [medicines, setMedicines] = useState(null);
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";

  const { userId } = useSelector((state) => {
    return state.userSlice;
  });

  useEffect(() => {
    getMedicineData();
  }, []);

  const getMedicineData = async () => {
    const res = await getMedicine(userId);
    setMedicines(res.medicine);
  };

  const handleBuyBtn = async (userId) => {
    const res = await buyMedicines(userId)
    alert(res.message);
    getMedicineData();
  };

  const generatePDF = async (medicine) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(124, 58, 237); // Purple
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("HOSPITAL MANAGEMENT SYSTEM", 10, 25);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Official Prescription Document", 10, 32);
    
    // Content
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    
    doc.setFont("helvetica", "bold");
    doc.text("Patient Name:", 10, 60);
    doc.setFont("helvetica", "normal");
    doc.text(medicine.userName, 45, 60);
    
    doc.setFont("helvetica", "bold");
    doc.text("Doctor Name:", 10, 70);
    doc.setFont("helvetica", "normal");
    doc.text(medicine.doctorName, 45, 70);
    
    doc.setFont("helvetica", "bold");
    doc.text("Date:", 10, 80);
    doc.setFont("helvetica", "normal");
    doc.text(new Date(medicine.createdAt).toLocaleDateString(), 45, 80);
    
    doc.setFont("helvetica", "bold");
    doc.text("Status:", 10, 90);
    doc.setFont("helvetica", "normal");
    doc.text(medicine.status, 45, 90);
    
    // Prescription Box
    doc.setDrawColor(124, 58, 237);
    doc.setLineWidth(1);
    doc.rect(10, 100, 190, 60);
    
    doc.setFont("helvetica", "bold");
    doc.text("Prescribed Medicine:", 15, 110);
    
    doc.setFont("helvetica", "normal");
    const splitText = doc.splitTextToSize(medicine.medicine, 180);
    doc.text(splitText, 15, 120);
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("This is a computer-generated document.", 10, 280);
    
    doc.save(`prescription-${medicine._id}.pdf`);
  };

  return (
    <div className={`p-6 md:p-10 font-sans space-y-8 min-h-full flex flex-col ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
      <Search title={tObj?.medicineTitle || "My Prescriptions"} />
      
      <div className="py-2 flex-1">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {medicines && medicines.length > 0 ? (
            medicines.map((medicine) => (
              <div
                key={medicine._id}
                className={`group flex flex-col justify-between p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden ${dark ? 'bg-gray-900 border-gray-800 hover:shadow-black/50 hover:border-purple-500/50' : 'bg-white border-gray-100 shadow-sm hover:shadow-purple-500/10 hover:border-purple-200'}`}
              >


                {/* Decorative Background Blob */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${dark ? 'bg-purple-500' : 'bg-purple-600'}`}></div>

                <div className="relative z-10 space-y-4 flex-1">
                  <div className="flex justify-between items-start">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${medicine.status === 'Completed' ? (dark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700') : medicine.status === 'pending' ? (dark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700') : (dark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700')}`}>
                        {medicine.status === 'pending' ? 'Pending Purchase' : medicine.status}
                     </span>
                     <span className={`text-xs font-medium ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                       {new Date(medicine.createdAt).toLocaleDateString()}
                     </span>
                  </div>

                  <h2 className="text-2xl font-black tracking-tight text-purple-600 dark:text-purple-400 line-clamp-2">
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
                        <span className="font-semibold">{tObj?.colMedicine || "Prescription"}:</span> 
                        <p className="mt-1 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg text-xs leading-relaxed border dark:border-gray-800">{medicine.medicine}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className={dark ? 'text-gray-500' : 'text-gray-400'} />
                      <span className="font-semibold">{tObj?.colDate || "Date"}:</span> {new Date(medicine.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  {medicine?.status === 'pending' ? (
                    <button
                      onClick={() => handleBuyBtn(medicine._id)}
                      className="relative z-10 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-md shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5"
                    >
                      <ShoppingCart size={18} />
                      {tObj?.buyMedicineBtn || "Buy Medicine"}
                    </button>
                  ) : (
                    <div className={`relative z-10 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold ${dark ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'}`}>
                      <CheckCircle2 size={18} />
                      {tObj?.purchasedBtn || "Purchased"}
                    </div>
                  )}
                  
                  <button
                    onClick={() => generatePDF(medicine)}
                    className={`relative z-10 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold transition-all duration-300 ${dark ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} hover:-translate-y-0.5`}
                  >
                    <Download size={18} />
                    Download PDF
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-3xl dark:border-gray-800 border-gray-200 h-full">
               <FileText size={64} className="mb-4 opacity-20" />
               <h3 className="text-xl font-semibold">{tObj?.noRecordsFoundText || "No Medicine Records Found."}</h3>
               <p className="mt-2 text-sm max-w-sm text-center">You have no active prescriptions at this time.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPharmesy;