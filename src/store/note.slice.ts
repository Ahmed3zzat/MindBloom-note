import { noteState } from "@/types/note.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { RootState } from "./store";

// to add neww note
export const addNote = createAsyncThunk(
  "notes/addNote",
  async (values: { title: string; content: string }, store) => {
    const state = store.getState() as RootState;
    const token = state.userSlice.token;
    // console.log(token);

    const options = {
      url: `https://note-sigma-black.vercel.app/api/v1/notes`,
      method: `POST`,
      data: values,
      headers: {
        token: `3b8ny__${token}`,
      },
    };
    const { data } = await axios.request(options);
    return data;
  }
);

// to get user notes
export const getNote = createAsyncThunk("notes/getNote", async (_, store) => {
  const state = store.getState() as RootState;
  const token = state.userSlice.token;
  // console.log(token);

  const options = {
    url: `https://note-sigma-black.vercel.app/api/v1/notes`,
    method: `GET`,
    headers: {
      token: `3b8ny__${token}`,
    },
  };
  const { data } = await axios.request(options);
  return data;
});

// to update note
export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async (
    { id, title, content }: { id: string; title: string; content: string },
    store
  ) => {
    const state = store.getState() as RootState;
    const token = state.userSlice.token;

    const options = {
      url: `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
      method: `PUT`,
      data: {
        title,
        content,
      },
      headers: {
        token: `3b8ny__${token}`,
      },
    };
    const { data } = await axios.request(options);
    console.log(data);
    return data;
  }
);

// to delete note
export const deleteNote = createAsyncThunk<void, string>(
  "notes/deleteNote",
  async (id, store) => {
    const state = store.getState() as RootState;
    const token = state.userSlice.token;
    const options = {
      url: `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
      method: `DELETE`,
      headers: {
        token: `3b8ny__${token}`,
      },
    };
    await axios.request(options);
  }
);

const initialState: noteState = {
  msg: null,
  notes: null,
  error: "",
  isLoading: false,
  isError: false,
  idToast: "",
};
const noteSS = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // to add note
    builder.addCase(addNote.fulfilled, () => {
      toast.success("note is added");
    });
    builder.addCase(addNote.rejected, () => {
      toast.error("check your data & netork");
    });
    builder.addCase(addNote.pending, () => {});

    //to get note
    builder.addCase(getNote.fulfilled, (prevStata, action) => {
      prevStata.notes = action.payload.notes;
      prevStata.msg = action.payload.msg;
      prevStata.isError = false;
      prevStata.isLoading = false;
    });
    builder.addCase(getNote.rejected, (prevStata) => {
      prevStata.isError = true;
      prevStata.isLoading = false;
    });
    builder.addCase(getNote.pending, (prevStata) => {
      prevStata.isError = false;
      prevStata.isLoading = true;
    });

    // to update note
    builder.addCase(updateNote.fulfilled, (prevStata) => {
      prevStata.isError = false;
      prevStata.isLoading = false;
      toast.dismiss(prevStata.idToast);
      toast.success("Note is update");
    });
    builder.addCase(updateNote.rejected, (prevStata) => {
      prevStata.isError = true;
      prevStata.isLoading = false;
      toast.dismiss(prevStata.idToast);
      toast.error("check your DATA & NETWORK");
    });
    builder.addCase(updateNote.pending, (prevStata) => {
      prevStata.isError = false;
      prevStata.isLoading = true;
      prevStata.idToast = toast.loading("Loading...");
    });

    //delete user note
    builder.addCase(deleteNote.fulfilled, (prevStata) => {
      prevStata.isError = false;
      prevStata.isLoading = false;
      toast.dismiss(prevStata.idToast);
      toast.success("Note is deleted");
    });
    builder.addCase(deleteNote.rejected, (prevStata) => {
      prevStata.isError = true;
      prevStata.isLoading = false;
      toast.dismiss(prevStata.idToast);
      toast.error("check your DATA & NETWORK");
    });
    builder.addCase(deleteNote.pending, (prevStata) => {
      prevStata.isError = false;
      prevStata.isLoading = true;
      prevStata.idToast = toast.loading("Loading...");
    });
  },
});
export const noteSlice = noteSS.reducer;
