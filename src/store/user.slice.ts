import { userState } from "@/types/userType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const setSignup = createAsyncThunk(
  "user/setSignup",
  async (values: {
    name: string;
    email: string;
    password: string;
    age: string;
    phone: string;
  }) => {
    const options = {
      url: `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
      method: "POST",
      data: values,
    };
    const { data } = await axios.request(options);
    return data;
  }
);

export const setLogin = createAsyncThunk(
  "user/setLogin",
  async (values: { email: string; password: string }) => {
    const options = {
      url: `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
      method: "POST",
      data: values,
    };
    const  {data}  = await axios.request(options);
    return data;
  }
);

const initialState: userState = {
  msg: "",
  token: localStorage.getItem("token"),
  isError: false,
  isLoading: false,
  idToast: "",
};
const userS = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setSignup.fulfilled, () => {
      // console.log("✅");
    });
    builder.addCase(setSignup.rejected, () => {
      // console.log("❌");
    });
    builder.addCase(setSignup.pending, () => {
      // console.log("🚴‍♀️");
    });
    builder.addCase(setLogin.fulfilled, (prevState, action) => {
      // console.log("✅");
      prevState.isError = false;
      prevState.isLoading = false;
      prevState.msg = action.payload.msg;
      prevState.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      toast.dismiss(prevState.idToast)
      toast.success("Login Success")
    });
    builder.addCase(setLogin.rejected, (prevState) => {
      // console.log("❌");
      prevState.isError = true;
      prevState.isLoading = false;
      prevState.msg = "check your email or password";
      toast.dismiss(prevState.idToast)
      toast.error("Invalid data")
      // console.log(action);
    });
    builder.addCase(setLogin.pending, (prevState) => {
      // console.log("🚴‍♀️");
      prevState.idToast=toast.loading("Loading...")
      prevState.isError = false;
      prevState.isLoading = true;
    });
  },
});
export const userSlice = userS.reducer;
