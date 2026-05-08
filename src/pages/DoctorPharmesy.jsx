import { useEffect, useState, useContext } from "react";
import { getPatients, giveMedicine } from "../services/admin";
import { useSelector } from "react-redux";
import { AppContext } from "../context/AppContext";
import { Pill, User, Stethoscope, FilePlus2, CheckCircle2 } from "lucide-react";

const DoctorPharmesy = () => {
  const { userId } = useSelector((state) => {
    return state.userSlice;
  });
  const [users, setUsers] = useState(null);
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";

  const [formData, setFormData] = useState({
    disease: "",
    medicine: "",
    userId: "",
    doctorId: userId,
  });
  
  const [isBlur, setBlur] = useState({
    disease: false,
    medicine: false,
    userId: false,
  });
  const [error, setError] = useState();

  const handleBlur = (e) => {
    const { id } = e.target;
    setBlur((prev) => ({ ...prev, [id]: true }));
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setBlur((prev) => ({ ...prev, [id]: false }));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getPatients();
    setUsers(data.users);
  };

  const isDiseaseInvalid = isBlur.disease && formData.disease.length < 3;
  const isMedicinelInvalid = isBlur.medicine && formData.medicine.length < 3;
  let isUserIdInvalid = isBlur.userId && (formData.userId === "" || formData.userId === "null");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const data = await giveMedicine(formData);
      alert(data.message);
      // Optional: Reset form on success
      setFormData({ disease: "", medicine: "", userId: "", doctorId: userId });
      setBlur({ disease: false, medicine: false, userId: false });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={`w-full min-h-full p-6 md:p-10 flex justify-center items-center font-sans ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-2xl relative overflow-hidden rounded-3xl p-8 md:p-10 shadow-2xl transition-all duration-300 ${dark ? 'bg-gray-900 border border-gray-800 shadow-black/50' : 'bg-white border border-gray-100 shadow-blue-500/10'}`}
      >
        {/* Decorative background gradients */}
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none ${dark ? 'bg-teal-500' : 'bg-teal-400'}`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none ${dark ? 'bg-blue-600' : 'bg-blue-500'}`}></div>

        <div className="relative z-10 flex flex-col items-center mb-10">
          <div className={`p-4 rounded-full mb-4 inline-flex ${dark ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600'}`}>
            <FilePlus2 size={32} />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-center">
            {tObj?.giveMedicineTitle || "Prescribe Medicine"}
          </h2>
          <p className={`mt-2 text-center max-w-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
             Provide a detailed prescription for your patient's treatment.
          </p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="userId" className={`font-semibold flex items-center gap-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
              <User size={18} /> {tObj?.selectUserLbl || "Select Patient"}
            </label>
            <div className="relative">
              <select
                onChange={handleInput}
                onBlur={handleBlur}
                className={`w-full appearance-none border rounded-xl px-4 py-3.5 pl-11 transition-all focus:ring-2 focus:ring-offset-0 focus:outline-none ${dark ? 'bg-gray-800 border-gray-700 focus:ring-teal-500/50 text-white' : 'bg-gray-50 border-gray-200 focus:ring-teal-500/50 text-gray-900'} ${isUserIdInvalid ? 'border-red-500 focus:ring-red-500/50' : ''}`}
                id="userId"
                value={formData.userId}
              >
                <option value="null">- {tObj?.selectUserLbl || "Select Patient"} -</option>
                {users &&
                  users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.userName}
                    </option>
                  ))}
              </select>
              <User size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            {isUserIdInvalid && (
              <p className="text-sm text-red-500 font-medium pl-1 animate-pulse">Please select a valid patient</p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="disease" className={`font-semibold flex items-center gap-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
              <Stethoscope size={18} /> {tObj?.diseaseLbl || "Diagnosis / Disease"}
            </label>
            <div className="relative">
               <input
                 onChange={handleInput}
                 onBlur={handleBlur}
                 className={`w-full border rounded-xl px-4 py-3.5 pl-11 transition-all focus:ring-2 focus:ring-offset-0 focus:outline-none ${dark ? 'bg-gray-800 border-gray-700 focus:ring-teal-500/50 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 focus:ring-teal-500/50 text-gray-900 placeholder-gray-400'} ${isDiseaseInvalid ? 'border-red-500 focus:ring-red-500/50' : ''}`}
                 type="text"
                 id="disease"
                 value={formData.disease}
                 placeholder="e.g. Viral Fever"
               />
               <Stethoscope size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            {isDiseaseInvalid && (
              <p className="text-sm text-red-500 font-medium pl-1 animate-pulse">Please enter a valid diagnosis (min 3 characters)</p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="medicine" className={`font-semibold flex items-center gap-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
              <Pill size={18} /> {tObj?.medicineLbl || "Prescription Details"}
            </label>
            <div className="relative">
               <textarea
                 rows={6}
                 onChange={handleInput}
                 onBlur={handleBlur}
                 className={`w-full resize-none border rounded-xl px-4 py-3.5 pl-11 transition-all focus:ring-2 focus:ring-offset-0 focus:outline-none ${dark ? 'bg-gray-800 border-gray-700 focus:ring-teal-500/50 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 focus:ring-teal-500/50 text-gray-900 placeholder-gray-400'} ${isMedicinelInvalid ? 'border-red-500 focus:ring-red-500/50' : ''}`}
                 id="medicine"
                 value={formData.medicine}
                 placeholder="1. Paracetamol 500mg - Twice a day&#10;2. Rest for 3 days"
               />
               <Pill size={18} className={`absolute left-4 top-4 pointer-events-none ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            {isMedicinelInvalid && (
              <p className="text-sm text-red-500 font-medium pl-1 animate-pulse">Please enter detailed prescription</p>
            )}
          </div>

          <div className="pt-4 flex flex-col items-center">
            <button 
               className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 py-3.5 font-bold text-white shadow-lg shadow-teal-500/30 transition-all hover:scale-[1.02] hover:shadow-teal-500/50 focus:outline-none active:scale-[0.98]"
            >
               <span className="relative z-10 flex items-center justify-center gap-2">
                 <CheckCircle2 size={20} />
                 {tObj?.giveMedicineBtn || "Issue Prescription"}
               </span>
               <div className="absolute inset-0 z-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0 duration-300"></div>
            </button>
            
            {error && (
               <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium w-full text-center">
                  {error}
               </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default DoctorPharmesy;
