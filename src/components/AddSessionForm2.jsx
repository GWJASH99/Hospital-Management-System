import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../context/AppContext";
import { Calendar, Clock, Hash, X, PlusCircle, Loader2, ClipboardList, Stethoscope } from "lucide-react";

const AddSessionForm2 = ({ setShowForm, refreshFunction }) => {
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const { userEmail } = useSelector((state) => {
    return state.userSlice;
  });

  const [formData, setFormData] = useState({
    sessionTitle: "",
    doctorEmail: userEmail,
    time: "",
    slot: "",
  });

  const [isBlur, setBlur] = useState({
    sessionTitle: false,
    time: false,
    slot: false,
  });

  const handleBlur = (e) => {
    const { id } = e.target;
    setBlur((prev) => ({ ...prev, [id]: true }));
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setBlur((prev) => ({ ...prev, [id]: false }));
  };

  const isTitleInvalid =
    isBlur.sessionTitle && formData.sessionTitle.trim().length < 3;
  const isDoctorInvalid =
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.doctorEmail);
  const isTimeInvalid = isBlur.time && !formData.time.trim();
  const isSlotInvalid =
    isBlur.slot &&
    (!formData.slot || isNaN(formData.slot) || Number(formData.slot) <= 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isTitleInvalid || isDoctorInvalid || isTimeInvalid || isSlotInvalid) {
      setError("Please correct the highlighted fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/admin/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert(data.message);
        setShowForm(false);
        refreshFunction();
      } else {
        setError(data.message || "Failed to add session.");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
        onClick={() => setShowForm(false)}
      ></div>
      
      <form
        onSubmit={handleSubmit}
        className={`relative w-full max-w-lg overflow-hidden rounded-[2.5rem] p-8 md:p-10 shadow-2xl transition-all duration-300 transform animate-in zoom-in-95 slide-in-from-bottom-4 ${dark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100'}`}
      >
        {/* Decorative Background */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 ${dark ? 'bg-blue-500' : 'bg-blue-400'}`}></div>

        <button 
          type="button"
          onClick={() => setShowForm(false)}
          className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${dark ? 'text-gray-500 hover:bg-gray-800 hover:text-white' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'}`}
        >
          <X size={24} />
        </button>

        <div className="relative z-10 flex flex-col items-center text-center mb-8">
           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${dark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
              <Stethoscope size={28} />
           </div>
           <h2 className={`text-2xl font-black tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
             {tObj?.addSessionTitle || "New Consultation"}
           </h2>
           <p className={`mt-2 text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
             Add a new availability slot for your patients.
           </p>
        </div>

        <div className="relative z-10 space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="sessionTitle" className={`text-xs font-bold flex items-center gap-2 ${dark ? 'text-gray-400' : 'text-gray-700'}`}>
              <ClipboardList size={14} /> Session Title
            </label>
            <input
              id="sessionTitle"
              type="text"
              value={formData.sessionTitle}
              onChange={handleInput}
              onBlur={handleBlur}
              placeholder="e.g. Morning General Consultation"
              className={`w-full border rounded-xl px-4 py-3 transition-all outline-none focus:ring-2 focus:ring-offset-0 ${dark ? 'bg-gray-800 border-gray-700 focus:ring-blue-500/50 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 focus:ring-blue-500/50 text-gray-900 placeholder-gray-400'} ${isTitleInvalid ? 'border-red-500 focus:ring-red-500/50' : ''}`}
            />
            {isTitleInvalid && (
              <p className="text-[10px] text-red-500 font-medium px-1">Please enter a descriptive title</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="time" className={`text-xs font-bold flex items-center gap-2 ${dark ? 'text-gray-400' : 'text-gray-700'}`}>
                <Calendar size={14} /> Start Time
              </label>
              <input
                id="time"
                type="datetime-local"
                value={formData.time}
                onChange={handleInput}
                onBlur={handleBlur}
                className={`w-full border rounded-xl px-4 py-3 transition-all outline-none focus:ring-2 focus:ring-offset-0 ${dark ? 'bg-gray-800 border-gray-700 focus:ring-blue-500/50 text-white' : 'bg-gray-50 border-gray-200 focus:ring-blue-500/50 text-gray-900'} ${isTimeInvalid ? 'border-red-500 focus:ring-red-500/50' : ''}`}
              />
              {isTimeInvalid && (
                <p className="text-[10px] text-red-500 font-medium px-1">Required</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="slot" className={`text-xs font-bold flex items-center gap-2 ${dark ? 'text-gray-400' : 'text-gray-700'}`}>
                <Hash size={14} /> Max Patients
              </label>
              <input
                id="slot"
                type="number"
                value={formData.slot}
                onChange={handleInput}
                onBlur={handleBlur}
                placeholder="10"
                className={`w-full border rounded-xl px-4 py-3 transition-all outline-none focus:ring-2 focus:ring-offset-0 ${dark ? 'bg-gray-800 border-gray-700 focus:ring-blue-500/50 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 focus:ring-blue-500/50 text-gray-900 placeholder-gray-400'} ${isSlotInvalid ? 'border-red-500 focus:ring-red-500/50' : ''}`}
              />
              {isSlotInvalid && (
                <p className="text-[10px] text-red-500 font-medium px-1">Invalid count</p>
              )}
            </div>
          </div>

          <div className="pt-6 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <span className="flex items-center justify-center gap-2 text-sm">
                {loading ? <Loader2 size={18} className="animate-spin" /> : <PlusCircle size={18} />}
                {loading ? 'Adding...' : 'Create Session'}
              </span>
            </button>
            
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-colors ${dark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-bold text-center">
              {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddSessionForm2;
