import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User, Mail, Lock, X, UserPlus2, Loader2 } from "lucide-react";

const AddDoctorForm = ({ showForm, setShowForm, refreshFunction }) => {
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });
  const [isBlur, setBlur] = useState({
    userName: false,
    userEmail: false,
    userPassword: false,
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleBlur = (e) => {
    const { id } = e.target;
    setBlur((prev) => ({ ...prev, [id]: true }));
  };
  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setBlur((prev) => ({ ...prev, [id]: false }));
  };
  const isNameInvalid = isBlur.userName && formData.userName.length < 3;
  const isEmailInvalid =
    isBlur.userEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail);
  const isPassInvalid = isBlur.userPassword && formData.userPassword.length < 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/doctor", {
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
        setError(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
        className={`relative w-full max-w-lg overflow-hidden rounded-[2.5rem] p-8 md:p-12 shadow-2xl transition-all duration-300 transform animate-in zoom-in-95 slide-in-from-bottom-4 ${dark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100'}`}
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

        <div className="relative z-10 flex flex-col items-center text-center mb-10">
           <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${dark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
              <UserPlus2 size={32} />
           </div>
           <h2 className={`text-3xl font-black tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
             {tObj?.addDoctorTitle || "Add Professional"}
           </h2>
           <p className={`mt-2 text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
             Create a new account for a medical specialist.
           </p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <label htmlFor="userName" className={`text-sm font-bold flex items-center gap-2 ${dark ? 'text-gray-400' : 'text-gray-700'}`}>
              <User size={16} /> Full Name
            </label>
            <input
              id="userName"
              type="text"
              value={formData.userName}
              onChange={handleInput}
              onBlur={handleBlur}
              placeholder="Dr. John Doe"
              className={`w-full border rounded-2xl px-5 py-3.5 transition-all outline-none focus:ring-2 focus:ring-offset-0 ${dark ? 'bg-gray-800 border-gray-700 focus:ring-blue-500/50 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 focus:ring-blue-500/50 text-gray-900 placeholder-gray-400'} ${isNameInvalid ? 'border-red-500 focus:ring-red-500/50' : ''}`}
            />
            {isNameInvalid && (
              <p className="text-xs text-red-500 font-medium px-1 animate-pulse">Please enter a valid name (min 3 chars)</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="userEmail" className={`text-sm font-bold flex items-center gap-2 ${dark ? 'text-gray-400' : 'text-gray-700'}`}>
              <Mail size={16} /> Email Address
            </label>
            <input
              id="userEmail"
              type="email"
              value={formData.userEmail}
              onChange={handleInput}
              onBlur={handleBlur}
              placeholder="doctor@example.com"
              className={`w-full border rounded-2xl px-5 py-3.5 transition-all outline-none focus:ring-2 focus:ring-offset-0 ${dark ? 'bg-gray-800 border-gray-700 focus:ring-blue-500/50 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 focus:ring-blue-500/50 text-gray-900 placeholder-gray-400'} ${isEmailInvalid ? 'border-red-500 focus:ring-red-500/50' : ''}`}
            />
            {isEmailInvalid && (
              <p className="text-xs text-red-500 font-medium px-1 animate-pulse">Please enter a valid email address</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="userPassword" className={`text-sm font-bold flex items-center gap-2 ${dark ? 'text-gray-400' : 'text-gray-700'}`}>
              <Lock size={16} /> Security Password
            </label>
            <input
              id="userPassword"
              type="password"
              value={formData.userPassword}
              onChange={handleInput}
              onBlur={handleBlur}
              placeholder="••••••••"
              className={`w-full border rounded-2xl px-5 py-3.5 transition-all outline-none focus:ring-2 focus:ring-offset-0 ${dark ? 'bg-gray-800 border-gray-700 focus:ring-blue-500/50 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 focus:ring-blue-500/50 text-gray-900 placeholder-gray-400'} ${isPassInvalid ? 'border-red-500 focus:ring-red-500/50' : ''}`}
            />
            {isPassInvalid && (
              <p className="text-xs text-red-500 font-medium px-1 animate-pulse">Password must be at least 8 characters</p>
            )}
          </div>

          <div className="pt-4 space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? <Loader2 size={20} className="animate-spin" /> : <UserPlus2 size={20} />}
                {loading ? 'Adding Doctor...' : 'Confirm Registration'}
              </span>
            </button>
            
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className={`w-full py-4 rounded-2xl font-bold transition-colors ${dark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center animate-in slide-in-from-top-1">
              {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddDoctorForm;
