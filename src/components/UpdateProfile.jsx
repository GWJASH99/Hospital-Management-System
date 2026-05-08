import { useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/userSlice";
import { AppContext } from "../context/AppContext";
import { User, Mail, Lock, X, RefreshCw, Loader2, ShieldCheck } from "lucide-react";

const UpdateProfile = ({setShowForm}) => {
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";
  const dispatch = useDispatch();
  
  const { userName, userEmail, userId } = useSelector((state) => {
    return state.userSlice;
  });

  const [formData, setFormData] = useState({ 
    userName: userName || '', 
    userEmail: userEmail || "", 
    userPassword: '',
    userId: userId || '' 
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
    setBlur(prev => ({ ...prev, [id]: true }));
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setBlur(prev => ({ ...prev, [id]: false }));
  };

  const isNameInvalid = isBlur.userName && formData.userName.length < 3;
  const isEmailInvalid = isBlur.userEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail);
  const isPassInvalid = isBlur.userPassword && formData.userPassword.length < 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:9000/api/auth/delete", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      
      if (res.ok) {
        alert(data.message);
        dispatch(
          login({
            userName: data.user.userName,
            userId: data.user._id,
            role: data.user.role,
          })
        );
        localStorage.setItem("id", JSON.stringify(data.user._id));
        setShowForm(false);
      } else {
        setError(data.message || "Failed to update profile.");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity" 
        onClick={() => setShowForm(false)}
      ></div>
      
      <form
        onSubmit={handleSubmit}
        className={`relative w-full max-w-lg overflow-hidden rounded-[3rem] p-8 md:p-12 shadow-2xl transition-all duration-300 transform animate-in zoom-in-95 slide-in-from-bottom-4 ${dark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100'}`}
      >
        {/* Decorative elements */}
        <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-20 ${dark ? 'bg-indigo-500' : 'bg-indigo-400'}`}></div>

        <button 
          type="button"
          onClick={() => setShowForm(false)}
          className={`absolute top-8 right-8 p-2 rounded-full transition-colors ${dark ? 'text-gray-500 hover:bg-gray-800 hover:text-white' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'}`}
        >
          <X size={24} />
        </button>

        <div className="relative z-10 flex flex-col items-center text-center mb-10">
           <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6 shadow-lg ${dark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
              <ShieldCheck size={40} />
           </div>
           <h2 className={`text-3xl font-black tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
             {tObj?.updateProfileTitle || "Security Settings"}
           </h2>
           <p className={`mt-2 text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
             Keep your account information secure and up to date.
           </p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <label htmlFor="userName" className={`text-sm font-bold flex items-center gap-2 ${dark ? 'text-gray-400' : 'text-gray-700'}`}>
              <User size={16} /> Display Name
            </label>
            <input
              id="userName"
              type="text"
              value={formData.userName}
              onChange={handleInput}
              onBlur={handleBlur}
              placeholder="Full Name"
              className={`w-full border rounded-2xl px-6 py-4 transition-all outline-none focus:ring-4 focus:ring-offset-0 ${dark ? 'bg-gray-800 border-gray-700 focus:ring-indigo-500/20 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 focus:ring-indigo-500/10 text-gray-900 placeholder-gray-400'} ${isNameInvalid ? 'border-red-500 focus:ring-red-500/10' : ''}`}
            />
            {isNameInvalid && (
              <p className="text-xs text-red-500 font-medium px-2">Name must be at least 3 characters</p>
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
              placeholder="Email"
              className={`w-full border rounded-2xl px-6 py-4 transition-all outline-none focus:ring-4 focus:ring-offset-0 ${dark ? 'bg-gray-800 border-gray-700 focus:ring-indigo-500/20 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 focus:ring-indigo-500/10 text-gray-900 placeholder-gray-400'} ${isEmailInvalid ? 'border-red-500 focus:ring-red-500/10' : ''}`}
            />
            {isEmailInvalid && (
              <p className="text-xs text-red-500 font-medium px-2">Enter a valid email address</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="userPassword" className={`text-sm font-bold flex items-center gap-2 ${dark ? 'text-gray-400' : 'text-gray-700'}`}>
              <Lock size={16} /> New Password
            </label>
            <input
              id="userPassword"
              type="password"
              value={formData.userPassword}
              onChange={handleInput}
              onBlur={handleBlur}
              placeholder="Minimum 8 characters"
              className={`w-full border rounded-2xl px-6 py-4 transition-all outline-none focus:ring-4 focus:ring-offset-0 ${dark ? 'bg-gray-800 border-gray-700 focus:ring-indigo-500/20 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 focus:ring-indigo-500/10 text-gray-900 placeholder-gray-400'} ${isPassInvalid ? 'border-red-500 focus:ring-red-500/10' : ''}`}
            />
            {isPassInvalid && (
              <p className="text-xs text-red-500 font-medium px-2">Password is too short</p>
            )}
          </div>

          <div className="pt-8 flex flex-col gap-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white py-5 rounded-[1.5rem] font-bold shadow-xl shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? <Loader2 size={24} className="animate-spin" /> : <RefreshCw size={24} />}
                {loading ? 'Updating Profile...' : 'Save Changes'}
              </span>
            </button>
            
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className={`w-full py-4 rounded-2xl font-bold transition-all ${dark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center">
              {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
