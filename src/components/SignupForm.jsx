import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { AppContext } from "../context/AppContext";
import { User, Mail, Lock, Activity, ArrowRight } from "lucide-react";

const SignupForm = () => {
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";
  const t = tObj;

  const [formData, setFormData] = useState({ userName: "", userEmail: '', userPassword: '', })
  const [isBlur, setBlur] = useState({ userName: false, userEmail: false, userPassword: false, })
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState()

  const handleBlur = (e) => {
    const { id } = e.target
    setBlur(prev => ({ ...prev, [id]: true }))
  }
  const handleInput = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
    setBlur(prev => ({ ...prev, [id]: false }))
  }
  const isNameInvalid = isBlur.userName && formData.userName.length < 3
  const isEmailInvalid = isBlur.userEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail);
  const isPassInvalid = isBlur.userPassword && formData.userPassword.length < 8

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true);
      setError(null)
      const res = await fetch("http://localhost:9000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
              dispatch(
                login({
                  userName: data.user.userName,
                  userId: data.user._id,
                  role: data.user.role,
                })
              );
              localStorage.setItem("id", JSON.stringify(data.user._id));
              navigate("/home/main");
              window.location.reload();
            } else {
              console.log(data);
              setError(data.message);
            }

    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className={`fixed inset-0 z-40 flex justify-center items-center font-sans transition-colors duration-500 ${dark ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-indigo-500/20 dark:bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-pink-400/20 dark:bg-pink-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className={`relative flex w-full max-w-5xl h-[650px] shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl border ${dark ? 'bg-gray-900/60 border-gray-800' : 'bg-white/80 border-white'}`}>
        
        {/* Left Side: Illustration */}
        <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-indigo-600 to-purple-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20 hover:scale-105 transition-transform duration-1000"></div>
          
          <div className="relative z-10 flex items-center gap-3">
            <Activity className="h-10 w-10 text-white animate-bounce" style={{ animationDuration: '3s' }} />
            <h2 className="text-3xl font-black tracking-tight">eDoc</h2>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-5xl font-extrabold leading-tight mb-4">{t?.signupFormTitle || "Create an Account"}</h1>
            <p className="text-indigo-100 text-lg max-w-md">
              {t?.signupFormSub || "Join eDoc and experience premium healthcare with world-class specialists at your fingertips."}
            </p>
          </div>
          
          <div className="relative z-10 text-sm font-medium text-indigo-200">
            {t?.copyright || "© 2026 eDoc. All rights reserved."}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center overflow-y-auto">
          <div className="max-w-md w-full mx-auto space-y-6">
            
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight mb-2">{t?.navRegister || "Sign Up"}</h2>
              <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t?.haveAccountText || "Already have an account?"}{" "}
                <Link to="/login" className="font-semibold text-indigo-500 hover:text-indigo-600 underline-offset-4 hover:underline transition-all">
                  {t?.loginLink || "Sign In"}
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-1 group">
                <label htmlFor="userName" className={`block text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t?.nameLabel || "Full Name"}
                </label>
                <div className={`relative flex items-center border rounded-xl overflow-hidden transition-all duration-300 ${dark ? 'border-gray-700 bg-gray-800 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500' : 'border-gray-300 bg-white focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500'} ${isNameInvalid ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500' : ''}`}>
                  <div className="pl-4 text-gray-400">
                    <User size={18} className="group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    onChange={handleInput} onBlur={handleBlur}
                    className={`w-full px-4 py-3 outline-none bg-transparent ${dark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
                    type="text" id="userName" value={formData.userName}
                    placeholder={t?.namePlaceholder || "John Doe"}
                  />
                </div>
                {isNameInvalid && <p className="text-xs text-red-500 mt-1 pl-1 animate-pulse">{t?.invalidNameMsg || "Please enter a valid name."}</p>}
              </div>

              <div className="space-y-1 group">
                <label htmlFor="userEmail" className={`block text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t?.emailLabel || "Email Address"}
                </label>
                <div className={`relative flex items-center border rounded-xl overflow-hidden transition-all duration-300 ${dark ? 'border-gray-700 bg-gray-800 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500' : 'border-gray-300 bg-white focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500'} ${isEmailInvalid ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500' : ''}`}>
                  <div className="pl-4 text-gray-400">
                    <Mail size={18} className="group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    onChange={handleInput} onBlur={handleBlur}
                    className={`w-full px-4 py-3 outline-none bg-transparent ${dark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
                    type="text" id="userEmail"
                    placeholder={t?.emailPlaceholder || "example@gmail.com"}
                  />
                </div>
                {isEmailInvalid && <p className="text-xs text-red-500 mt-1 pl-1 animate-pulse">{t?.invalidEmailMsg || "Please enter a valid email."}</p>}
              </div>

              <div className="space-y-1 group">
                <label htmlFor="userPassword" className={`block text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t?.passwordLabel || "Password"}
                </label>
                <div className={`relative flex items-center border rounded-xl overflow-hidden transition-all duration-300 ${dark ? 'border-gray-700 bg-gray-800 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500' : 'border-gray-300 bg-white focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500'} ${isPassInvalid ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500' : ''}`}>
                  <div className="pl-4 text-gray-400">
                    <Lock size={18} className="group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    onChange={handleInput} onBlur={handleBlur}
                    className={`w-full px-4 py-3 outline-none bg-transparent ${dark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
                    type="password" id="userPassword"
                    placeholder={t?.passwordPlaceholder || "Enter your password"}
                  />
                </div>
                {isPassInvalid && <p className="text-xs text-red-500 mt-1 pl-1 animate-pulse">{t?.invalidPassMsg || "Password must be at least 8 characters."}</p>}
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></div>
                  {error}
                </div>
              )}

              <button 
                disabled={isLoading}
                className={`group relative w-full flex justify-center items-center gap-2 py-3.5 px-4 mt-2 border border-transparent rounded-xl text-white font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed ${isLoading ? 'bg-indigo-400' : 'bg-gradient-to-r from-indigo-600 to-indigo-500'}`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    {t?.signupBtn || "Create Account"}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
            
          </div>
        </div>
      </div>
      
      {/* Home Button Floating */}
      <Link to="/" className="fixed top-6 right-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-gray-200/20 dark:border-gray-800/50 rounded-full text-sm font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
        {t?.navHome || "Home"}
      </Link>
    </div>
  )
}

export default SignupForm;
