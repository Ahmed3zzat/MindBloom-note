import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user.slice";
import { noteSlice } from "./note.slice";

export const store = configureStore({ reducer: { userSlice,noteSlice } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
