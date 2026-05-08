import { useNavigate } from "react-router";
import { deleteAccount } from "../services/auth";
import { useSelector } from "react-redux";

const DeleteAccount = ({ setShowForm }) => {
  const navigate = useNavigate()
   const { userId } = useSelector((state) => {
    return state.userSlice;
  });
  const handleConfirmDelete = async ()=>{
    try {
      const res = await deleteAccount(userId)
      alert(res.message)
      navigate('/')
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    <div className="fixed inset-0 z-40 flex justify-center items-center bg-white text-lg font-semibold">
      <div className="bg-gray-100 p-8 rounded-2xl shadow-md w-[90%] max-w-md text-center">
        <h2 className="text-xl font-bold text-red-600 mb-6">
          Are you sure you want to delete your account?
        </h2>

        <div className="flex justify-between gap-6">
          <button
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
            onClick={handleConfirmDelete}
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
