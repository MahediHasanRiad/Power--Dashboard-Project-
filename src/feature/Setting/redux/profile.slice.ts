import { createSlice } from "@reduxjs/toolkit";
import { updateProfileThunk } from "./profile.thunk";
import { restPasswordThunk } from "./reset-password.thunk";

interface InitialType {
  fullname: string;
  displayname: string;
  bio: string;
  longitude: string;
  latitude: string;
}

interface initialStateType {
  data: InitialType | null;
  resetPass: any;
  isError: any;
  isLoading: boolean;
}

const initialState: initialStateType = {
  data: null,
  resetPass: "",
  isError: null,
  isLoading: true,
};

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // update profile
    builder
      .addCase(updateProfileThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.data = action.payload;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      });

    // reset password
    builder
      .addCase(restPasswordThunk.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(restPasswordThunk.fulfilled, (state, action) => {
        state.resetPass = action.payload;
        state.isError = null;
        state.isLoading = false;
      })
      .addCase(restPasswordThunk.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      });
  },
});

export const {} = updateProfileSlice.actions;
export default updateProfileSlice.reducer;
