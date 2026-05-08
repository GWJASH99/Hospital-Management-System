import { createSlice } from "@reduxjs/toolkit";
import { aboutMe } from "../services/auth";
let id = localStorage.getItem("id") || null;
if (id) {
  id = JSON.parse(id);
}
let user = null;
if (id) {
  user = await aboutMe(id);
}

const initialState = {
  isLogin: user ? true : false,
  userName: user?.userName || null,
  userEmail: user?.userEmail || null,
  userId: user?._id || null,
  role: user?.role || "",
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    login(state, action) {
      (state.isLogin = true),
        (state.userName = action.payload.userName),
        (state.userEmail = action.payload.userEmail),
        (state.userId = action.payload.userId),
        (state.role = action.payload.role);
    },
    logout(state, action) {
      (state.isLogin = false),
        (state.userName = null),
        (state.userEmail = null),
        (state.userId = null),
        (state.role = null);
    },
  },
});
user = null;
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
