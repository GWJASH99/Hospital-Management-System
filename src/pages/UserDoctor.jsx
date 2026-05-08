import Search from "../components/Search";
import AddDoctorForm from "../components/AddDoctorForm";
import { useEffect, useState, useContext } from "react";
import { getDoctors } from "../services/admin";
import { AppContext } from "../context/AppContext";
import { User, Mail, Stethoscope, Award, Heart } from "lucide-react";

const UserDoctor = () => {
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [doctors, setDoctors] = useState(null);
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";

  useEffect(() => {
    getDoctorsData();
  }, []);

  const getDoctorsData = async () => {
    const data = await getDoctors();
    setDoctors(data.doctors);
  };

  return (
    <div className={`p-6 md:p-10 font-sans space-y-8 min-h-full flex flex-col ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
      {showAddDoctor && (
        <AddDoctorForm
          showForm={showAddDoctor}
          setShowForm={setShowAddDoctor}
          refreshFunction={getDoctorsData}
        />
      )}
      
      <Search title={tObj?.doctorsTitle || "Our Specialists"} />

      <div className="py-2 flex-1">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {doctors && doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div
                key={doctor._id}
                className={`group relative flex flex-col p-6 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden ${dark ? 'bg-gray-900 border-gray-800 hover:shadow-blue-500/10 hover:border-blue-500/30' : 'bg-white border-gray-100 shadow-sm hover:shadow-blue-500/10 hover:border-blue-200'}`}
              >
                {/* Decorative Elements */}
                <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10 transition-transform duration-700 group-hover:scale-150 ${dark ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                <div className="absolute top-6 right-6 text-blue-500/20 group-hover:text-blue-500/40 transition-colors">
                   <Award size={48} strokeWidth={1} />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className={`w-24 h-24 rounded-3xl flex items-center justify-center font-black text-3xl shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${dark ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white' : 'bg-gradient-to-br from-blue-100 to-indigo-200 text-blue-700'}`}>
                       {doctor.userName?.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
                  </div>

                  <h3 className="text-2xl font-black tracking-tight mb-1 group-hover:text-blue-500 transition-colors">
                    {doctor.userName}
                  </h3>
                  <p className={`text-sm font-semibold uppercase tracking-widest mb-6 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Senior Specialist
                  </p>

                  <div className={`w-full p-4 rounded-2xl mb-6 space-y-3 ${dark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Mail size={14} className="text-blue-500" />
                      <span className={dark ? 'text-gray-400' : 'text-gray-600'}>{doctor.userEmail}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Stethoscope size={14} className="text-blue-500" />
                      <span className={dark ? 'text-gray-400' : 'text-gray-600'}>12+ Years Experience</span>
                    </div>
                  </div>

                  <button className={`w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${dark ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'}`}>
                    <Heart size={18} fill="currentColor" className="opacity-50" />
                    Book Appointment
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-[3rem] dark:border-gray-800 border-gray-200 h-full">
               <Stethoscope size={64} className="mb-4 opacity-20" />
               <h3 className="text-xl font-semibold">{tObj?.noDoctorsText || "No specialists found."}</h3>
               <p className="mt-2 text-sm max-w-sm text-center">We couldn't find any medical specialists at the moment. Please check back soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDoctor;
