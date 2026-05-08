import { useState, useContext } from "react";
import { UserCog, FileText, Trash2, ArrowRight } from "lucide-react";
import Search from "../components/Search";
import AccountDetails from "../components/AccountDetails";
import DeleteAccount from "../components/DeleteAccount";
import UpdateProfile from "../components/UpdateProfile";
import { AppContext } from "../context/AppContext";

const Setting = () => {
  const [showinformation, setShowinformation] = useState(false);
  const [showDeleteAccount, setDeleteAccount] = useState(false);
  const [showUpdateProfile, setUpdateProfile] = useState(false);
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";

  return (
    <div className={`p-6 md:p-10 font-sans space-y-8 min-h-full ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
      {/* Modals remain structurally the same but are visually hidden/shown */}
      {showinformation && <AccountDetails setShowForm={setShowinformation} />}
      {showDeleteAccount && <DeleteAccount setShowForm={setDeleteAccount} />}
      {showUpdateProfile && <UpdateProfile setShowForm={setUpdateProfile} />}

      <Search title={tObj?.settingsTitle || "Settings"} />

      <div className="py-5 flex flex-col gap-6 max-w-4xl mx-auto">
        
        {/* Update Profile Card */}
        <div 
          onClick={() => setUpdateProfile(true)} 
          className={`group flex items-center justify-between p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${dark ? 'bg-gray-900 border-gray-800 hover:shadow-black/50 hover:border-blue-500/50' : 'bg-white border-gray-100 shadow-sm hover:shadow-blue-500/10 hover:border-blue-200'}`}
        >
          <div className="flex items-center gap-6">
            <div className={`p-4 rounded-2xl transition-colors ${dark ? 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'}`}>
              <UserCog size={32} />
            </div>
            <div>
              <h2 className="text-blue-600 dark:text-blue-400 font-bold text-xl sm:text-2xl mb-1 transition-colors">
                {tObj?.accountSettingsTitle || "Account Settings"}
              </h2>
              <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                {tObj?.accountSettingsDesc || "Edit your account details & change password"}
              </p>
            </div>
          </div>
          <div className={`hidden sm:flex p-2 rounded-full transition-transform group-hover:translate-x-2 ${dark ? 'text-gray-500 group-hover:text-blue-400' : 'text-gray-400 group-hover:text-blue-600'}`}>
            <ArrowRight size={24} />
          </div>
        </div>

        {/* View Details Card */}
        <div
          onClick={() => setShowinformation(true)}
          className={`group flex items-center justify-between p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${dark ? 'bg-gray-900 border-gray-800 hover:shadow-black/50 hover:border-teal-500/50' : 'bg-white border-gray-100 shadow-sm hover:shadow-teal-500/10 hover:border-teal-200'}`}
        >
          <div className="flex items-center gap-6">
            <div className={`p-4 rounded-2xl transition-colors ${dark ? 'bg-teal-500/20 text-teal-400 group-hover:bg-teal-500/30' : 'bg-teal-100 text-teal-600 group-hover:bg-teal-200'}`}>
              <FileText size={32} />
            </div>
            <div>
              <h2 className="text-teal-600 dark:text-teal-400 font-bold text-xl sm:text-2xl mb-1 transition-colors">
                {tObj?.viewDetailsTitle || "View Account Details"}
              </h2>
              <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                {tObj?.viewDetailsDesc || "View personal information about your account"}
              </p>
            </div>
          </div>
          <div className={`hidden sm:flex p-2 rounded-full transition-transform group-hover:translate-x-2 ${dark ? 'text-gray-500 group-hover:text-teal-400' : 'text-gray-400 group-hover:text-teal-600'}`}>
            <ArrowRight size={24} />
          </div>
        </div>

        {/* Delete Account Card */}
        <div 
          onClick={() => setDeleteAccount(true)} 
          className={`group flex items-center justify-between p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${dark ? 'bg-gray-900 border-gray-800 hover:shadow-black/50 hover:border-red-500/50' : 'bg-white border-gray-100 shadow-sm hover:shadow-red-500/10 hover:border-red-200'}`}
        >
          <div className="flex items-center gap-6">
            <div className={`p-4 rounded-2xl transition-colors ${dark ? 'bg-red-500/10 text-red-500 group-hover:bg-red-500/20 group-hover:text-red-400' : 'bg-red-50 text-red-500 group-hover:bg-red-100 group-hover:text-red-600'}`}>
              <Trash2 size={32} />
            </div>
            <div>
              <h2 className={`font-bold text-xl sm:text-2xl mb-1 transition-colors ${dark ? 'text-red-500 group-hover:text-red-400' : 'text-red-600 group-hover:text-red-700'}`}>
                {tObj?.deleteAccountTitle || "Delete Account"}
              </h2>
              <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                {tObj?.deleteAccountDesc || "Will permanently remove your account"}
              </p>
            </div>
          </div>
          <div className={`hidden sm:flex p-2 rounded-full transition-transform group-hover:translate-x-2 ${dark ? 'text-gray-500 group-hover:text-red-400' : 'text-gray-400 group-hover:text-red-600'}`}>
            <ArrowRight size={24} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Setting;
