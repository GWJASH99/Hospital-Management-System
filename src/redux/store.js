import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/userSlice"

const user = configureStore({
    reducer:{
        userSlice:userSlice
    }
})
export default user