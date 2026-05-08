import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { AppContext } from "../context/AppContext";
import { 
  Stethoscope, ShieldCheck, Clock, Users, ArrowRight,
  Menu, X, Sun, Moon, Globe, HeartPulse, Eye, Ear, Activity, Star
} from "lucide-react";

const Home = () => {
  const { isLogin } = useSelector((state) => state.userSlice);

  const { theme, toggleTheme, lang, changeLanguage, tObj } = useContext(AppContext);
  const dark = theme === "dark";
  const setDark = toggleTheme;
  const setLang = changeLanguage;
  const t = tObj;

  const [menuOpen, setMenuOpen] = useState(false);

  // Expand text translations for new sections
  const text = {
    EN: {
      navHome: "Home",
      navLogin: "Login",
      navRegister: "Register",
      loggedIn: "Logged In",
      heroTitle: "Avoid Hassles & Delays",
      heroSub: "Book appointments instantly. Experience premium healthcare with top-tier specialists, zero waiting time, and modern facilities.",
      ctaButton: "Book Appointment",
      whyUsTitle: "Why Choose eDoc",
      whyUsCards: [
        { title: "24/7 Service", desc: "Always available for emergencies." },
        { title: "Top Doctors", desc: "Expert specialists in every field." },
        { title: "Trusted Care", desc: "Thousands of satisfied patients." }
      ],
      servicesTitle: "Our Premium Services",
      servicesList: [
        { name: "Cardiology", desc: "Advanced heart care." },
        { name: "Ophthalmology", desc: "Crystal clear vision care." },
        { name: "ENT Specialist", desc: "Expert ear, nose & throat care." },
        { name: "General Checkup", desc: "Comprehensive health screening." }
      ],
      statsTitle: "Excellence by the Numbers",
      statsList: [
        { value: "10K+", label: "Happy Patients" },
        { value: "50+", label: "Specialist Doctors" },
        { value: "20+", label: "Awards Won" },
        { value: "24/7", label: "Emergency Support" }
      ],
      testimonialsTitle: "What Our Patients Say",
      testimonials: [
        { name: "Sarah L.", text: "The booking process was incredibly smooth. I didn't have to wait at all!" },
        { name: "John D.", text: "Top-notch facility and very professional doctors. Highly recommend eDoc." }
      ],
      ctaBannerTitle: "Ready to prioritize your health?",
      footerDesc: "Modern healthcare made simple, efficient, and accessible.",
      footerLinks: "Quick Links",
      footerContact: "Contact Us",
      footerEmail: "support@edoc.com",
      footerPhone: "+91 99999 99999",
      copyright: "© 2026 eDoc. All rights reserved."
    },
    HI: {
      navHome: "होम",
      navLogin: "लॉगिन",
      navRegister: "रजिस्टर",
      loggedIn: "लॉग इन हैं",
      heroTitle: "परेशानी और देरी से बचें",
      heroSub: "तुरंत अपॉइंटमेंट बुक करें। शीर्ष विशेषज्ञों, शून्य प्रतीक्षा समय और आधुनिक सुविधाओं के साथ प्रीमियम स्वास्थ्य सेवा का अनुभव करें।",
      ctaButton: "अपॉइंटमेंट लें",
      whyUsTitle: "eDoc क्यों चुनें",
      whyUsCards: [
        { title: "24/7 सेवा", desc: "आपात स्थिति के लिए हमेशा उपलब्ध।" },
        { title: "शीर्ष डॉक्टर", desc: "हर क्षेत्र में विशेषज्ञ डॉक्टर।" },
        { title: "विश्वसनीय देखभाल", desc: "हजारों संतुष्ट मरीज।" }
      ],
      servicesTitle: "हमारी प्रीमियम सेवाएँ",
      servicesList: [
        { name: "हृदय रोग विशेषज्ञ", desc: "उन्नत हृदय देखभाल।" },
        { name: "नेत्र रोग विशेषज्ञ", desc: "स्पष्ट दृष्टि देखभाल।" },
        { name: "ईएनटी विशेषज्ञ", desc: "कान, नाक और गले की देखभाल।" },
        { name: "सामान्य जांच", desc: "व्यापक स्वास्थ्य जांच।" }
      ],
      statsTitle: "आंकड़ों में उत्कृष्टता",
      statsList: [
        { value: "10K+", label: "संतुष्ट मरीज" },
        { value: "50+", label: "विशेषज्ञ डॉक्टर" },
        { value: "20+", label: "पुरस्कार जीते" },
        { value: "24/7", label: "आपातकालीन सहायता" }
      ],
      testimonialsTitle: "हमारे मरीज क्या कहते हैं",
      testimonials: [
        { name: "सारा एल.", text: "बुकिंग प्रक्रिया अविश्वसनीय रूप से आसान थी। मुझे बिल्कुल भी इंतजार नहीं करना पड़ा!" },
        { name: "जॉन डी.", text: "शीर्ष स्तर की सुविधा और बहुत ही पेशेवर डॉक्टर। अत्यधिक अनुशंसित eDoc." }
      ],
      ctaBannerTitle: "क्या आप अपने स्वास्थ्य को प्राथमिकता देने के लिए तैयार हैं?",
      footerDesc: "आधुनिक स्वास्थ्य सेवा को सरल, कुशल और सुलभ बनाया गया।",
      footerLinks: "त्वरित लिंक",
      footerContact: "संपर्क करें",
      footerEmail: "support@edoc.com",
      footerPhone: "+91 99999 99999",
      copyright: "© 2026 eDoc. सर्वाधिकार सुरक्षित।"
    },
    PA: {
      navHome: "ਹੋਮ",
      navLogin: "ਲਾਗਇਨ",
      navRegister: "ਰਜਿਸਟਰ",
      loggedIn: "ਲਾਗਇਨ ਹੋ",
      heroTitle: "ਝੰਜਟ ਤੇ ਦੇਰੀ ਤੋਂ ਬਚੋ",
      heroSub: "ਤੁਰੰਤ ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ। ਚੋਟੀ ਦੇ ਮਾਹਰਾਂ, ਜ਼ੀਰੋ ਉਡੀਕ ਸਮਾਂ ਅਤੇ ਆਧੁਨਿਕ ਸਹੂਲਤਾਂ ਨਾਲ ਪ੍ਰੀਮੀਅਮ ਸਿਹਤ ਸੰਭਾਲ ਦਾ ਅਨੁਭਵ ਕਰੋ।",
      ctaButton: "ਅਪਾਇੰਟਮੈਂਟ ਲਓ",
      whyUsTitle: "eDoc ਕਿਉਂ ਚੁਣੋ",
      whyUsCards: [
        { title: "24/7 ਸੇਵਾ", desc: "ਐਮਰਜੈਂਸੀ ਲਈ ਹਮੇਸ਼ਾ ਉਪਲਬਧ।" },
        { title: "ਚੋਟੀ ਦੇ ਡਾਕਟਰ", desc: "ਹਰ ਖੇਤਰ ਵਿੱਚ ਮਾਹਰ ਡਾਕਟਰ।" },
        { title: "ਭਰੋਸੇਯੋਗ ਦੇਖਭਾਲ", desc: "ਹਜ਼ਾਰਾਂ ਸੰਤੁਸ਼ਟ ਮਰੀਜ਼।" }
      ],
      servicesTitle: "ਸਾਡੀਆਂ ਪ੍ਰੀਮੀਅਮ ਸੇਵਾਵਾਂ",
      servicesList: [
        { name: "ਦਿਲ ਦੇ ਮਾਹਰ", desc: "ਉੱਨਤ ਦਿਲ ਦੀ ਦੇਖਭਾਲ।" },
        { name: "ਅੱਖਾਂ ਦੇ ਮਾਹਰ", desc: "ਸਪਸ਼ਟ ਨਜ਼ਰ ਦੀ ਦੇਖਭਾਲ।" },
        { name: "ਈਐਨਟੀ ਮਾਹਰ", desc: "ਕੰਨ, ਨੱਕ ਅਤੇ ਗਲੇ ਦੀ ਦੇਖਭਾਲ।" },
        { name: "ਆਮ ਜਾਂਚ", desc: "ਵਿਆਪਕ ਸਿਹਤ ਜਾਂਚ।" }
      ],
      statsTitle: "ਅੰਕੜਿਆਂ ਵਿੱਚ ਉੱਤਮਤਾ",
      statsList: [
        { value: "10K+", label: "ਸੰਤੁਸ਼ਟ ਮਰੀਜ਼" },
        { value: "50+", label: "ਮਾਹਰ ਡਾਕਟਰ" },
        { value: "20+", label: "ਇਨਾਮ ਜਿੱਤੇ" },
        { value: "24/7", label: "ਐਮਰਜੈਂਸੀ ਸਹਾਇਤਾ" }
      ],
      testimonialsTitle: "ਸਾਡੇ ਮਰੀਜ਼ ਕੀ ਕਹਿੰਦੇ ਹਨ",
      testimonials: [
        { name: "ਸਾਰਾਹ ਐਲ.", text: "ਬੁਕਿੰਗ ਪ੍ਰਕਿਰਿਆ ਬਹੁਤ ਆਸਾਨ ਸੀ। ਮੈਨੂੰ ਬਿਲਕੁਲ ਵੀ ਉਡੀਕ ਨਹੀਂ ਕਰਨੀ ਪਈ!" },
        { name: "ਜੌਨ ਡੀ.", text: "ਚੋਟੀ ਦੀ ਸਹੂਲਤ ਅਤੇ ਬਹੁਤ ਪੇਸ਼ੇਵਰ ਡਾਕਟਰ। ਈ-ਡੌਕ ਦੀ ਜ਼ੋਰਦਾਰ ਸਿਫਾਰਸ਼ ਕਰਦਾ ਹਾਂ।" }
      ],
      ctaBannerTitle: "ਕੀ ਤੁਸੀਂ ਆਪਣੀ ਸਿਹਤ ਨੂੰ ਪਹਿਲ ਦੇਣ ਲਈ ਤਿਆਰ ਹੋ?",
      footerDesc: "ਆਧੁਨਿਕ ਸਿਹਤ ਸੰਭਾਲ ਨੂੰ ਸਰਲ, ਕੁਸ਼ਲ ਅਤੇ ਪਹੁੰਚਯੋਗ ਬਣਾਇਆ ਗਿਆ।",
      footerLinks: "ਤੁਰੰਤ ਲਿੰਕ",
      footerContact: "ਸੰਪਰਕ ਕਰੋ",
      footerEmail: "support@edoc.com",
      footerPhone: "+91 99999 99999",
      copyright: "© 2026 eDoc. ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।"
    }
  };

  // using context t

  // Icons array matching services
  const ServiceIcons = [HeartPulse, Eye, Ear, Stethoscope];
  const WhyUsIcons = [Clock, ShieldCheck, Users];

  return (
    <div className="font-sans text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-950 transition-colors duration-500 min-h-screen selection:bg-blue-500 selection:text-white">
      
      {/* ================= NAVBAR ================= */}
      <nav className="fixed w-full z-50 transition-all duration-300 backdrop-blur-xl bg-white/70 dark:bg-gray-950/70 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400">eDoc</h2>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center font-medium">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t.navHome}</Link>
            <Link to="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t.navLogin}</Link>
            <Link to="/signup" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t.navRegister}</Link>

            <div className="flex items-center gap-4 border-l border-gray-300 dark:border-gray-700 pl-4">
              <div className="relative group">
                <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">
                  <Globe size={18} />
                  <span>{lang}</span>
                </div>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                >
                  <option value="EN">EN</option>
                  <option value="HI">HI</option>
                  <option value="PA">PA</option>
                </select>
              </div>

              <button
                onClick={() => setDark(!dark)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              >
                {dark ? <Sun size={20} className="text-yellow-400"/> : <Moon size={20} className="text-slate-700" />}
              </button>

              {isLogin && (
                <div className="px-4 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 rounded-full text-sm font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  {t.loggedIn}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-600 dark:text-gray-300" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div className={`md:hidden absolute w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300 origin-top overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col px-6 py-4 gap-4">
            <Link to="/" className="font-medium" onClick={() => setMenuOpen(false)}>{t.navHome}</Link>
            <Link to="/login" className="font-medium" onClick={() => setMenuOpen(false)}>{t.navLogin}</Link>
            <Link to="/signup" className="font-medium" onClick={() => setMenuOpen(false)}>{t.navRegister}</Link>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-800">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-gray-100 dark:bg-gray-800 border-none px-3 py-2 rounded-lg outline-none text-sm font-medium"
              >
                <option value="EN">English</option>
                <option value="HI">हिंदी</option>
                <option value="PA">ਪੰਜਾਬੀ</option>
              </select>
              <button
                onClick={() => setDark(!dark)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium"
              >
                {dark ? <Sun size={18} className="text-yellow-400"/> : <Moon size={18} className="text-slate-700" />} Theme
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-6">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/30 dark:bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-400/20 dark:bg-teal-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="flex flex-col gap-8">
            <div className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-bold tracking-wide w-max">
              🏥 #1 Healthcare Platform
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              {t.heroTitle}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
              {t.heroSub}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to={isLogin ? `/home/main` : "/home"}
                className="group flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1"
              >
                {t.ctaButton}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-500/10 border border-white/20 dark:border-gray-800/50">
              <img
                src="bg01.jpg"
                className="w-full h-[600px] object-cover scale-105 hover:scale-100 transition-transform duration-1000"
                alt="Modern Hospital"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating Info Card */}
            <div className="absolute -bottom-10 -left-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 flex gap-4 items-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-600 dark:text-green-400">
                <Users size={28} />
              </div>
              <div>
                <p className="text-2xl font-bold dark:text-white">10k+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Happy Patients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 bg-white dark:bg-gray-900 px-6 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.whyUsTitle}</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.whyUsCards.map((item, i) => {
              const Icon = WhyUsIcons[i];
              return (
                <div key={i} className="group p-8 rounded-3xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-2">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.servicesTitle}</h2>
              <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.servicesList.map((item, i) => {
              const Icon = ServiceIcons[i];
              return (
                <div key={i} className="p-8 rounded-3xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <Icon size={40} className="text-blue-600 dark:text-blue-400 mb-6" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold mb-3">{item.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= ACHIEVEMENTS / STATS ================= */}
      <section className="py-20 relative bg-blue-600 overflow-hidden px-6">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-white text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/20">
            {t.statsList.map((item, i) => (
              <div key={i} className="flex flex-col items-center pl-8 md:pl-0">
                <div className="text-4xl md:text-5xl font-black mb-2">{item.value}</div>
                <div className="text-blue-100 font-medium text-sm md:text-base uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 bg-white dark:bg-gray-900 px-6 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.testimonialsTitle}</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-16"></div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t.testimonials.map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 text-left relative shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4 text-yellow-400">
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-6 text-lg leading-relaxed">"{item.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
                    {item.name.charAt(0)}
                  </div>
                  <h4 className="font-bold text-lg">{item.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto bg-gray-900 dark:bg-gray-800 rounded-[3rem] p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-teal-400"></div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">{t.ctaBannerTitle}</h2>
          <Link
            to={isLogin ? `/home/main` : "/home"}
            className="inline-flex items-center gap-2 px-10 py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            {t.ctaButton} <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white dark:bg-gray-950 pt-20 pb-10 px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-3xl font-black tracking-tight text-blue-600 dark:text-blue-400">eDoc</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm text-lg leading-relaxed">
              {t.footerDesc}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">{t.footerLinks}</h3>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400 font-medium">
              <li><Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t.navHome}</Link></li>
              <li><Link to="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t.navLogin}</Link></li>
              <li><Link to="/signup" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t.navRegister}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">{t.footerContact}</h3>
            <div className="space-y-4 text-gray-500 dark:text-gray-400 font-medium">
              <p className="flex items-center gap-3"><Globe size={18} className="text-blue-500"/> {t.footerEmail}</p>
              <p className="flex items-center gap-3"><Stethoscope size={18} className="text-blue-500"/> {t.footerPhone}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center pt-8 border-t border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-500 font-medium">
          {t.copyright}
        </div>
      </footer>

    </div>
  );
};

export default Home;