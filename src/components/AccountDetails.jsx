import { CircleX } from "lucide-react";
import { useSelector } from "react-redux";

const AccountDetails = ({ setShowForm }) => {
  const { userName, userEmail, role } = useSelector((state) => {
    return state.userSlice;
  });
  return (
    <div className="fixed inset-0 z-40 bg-white flex justify-center items-center text-2xl font-bold">
      <div className="relative p-6 md:px-10 rounded-2xl bg-gray-100 shadow-lg w-[90%] max-w-md">
        <button
          onClick={() => setShowForm(false)}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
          aria-label="Close"
        >
          <CircleX size={28} />
        </button>

        <h2 className="text-center py-4 text-2xl font-semibold text-blue-600">
          Account Details
        </h2>

        <div className="flex flex-col gap-4 text-base text-gray-700 mt-4">
          <div>
            <span className="font-medium text-gray-500">Name:</span> {userName}
          </div>
          <div>
            <span className="font-medium text-gray-500">Email:</span>{" "}
            {userEmail}
          </div>
          <div>
            <span className="font-medium text-gray-500">Role:</span> {role}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountDetails;
