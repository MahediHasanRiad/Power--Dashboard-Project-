import { createSlice } from "@reduxjs/toolkit";
import { authThunk } from "./auth.thunk";

interface AuthState {
  auth: {
    email: string;
    password: string;
    role: "USER" | "ADMIN";
  } | null;
  isLoading: boolean;
  isError: any | null;
}

const initialState: AuthState = {
  auth: null,
  isLoading: false,
  isError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder
      .addCase(authThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(authThunk.fulfilled, (state, action) => {
        console.log('dddd', action.payload)
        state.auth = action.payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(authThunk.rejected, (state, action) => {
        state.isError = action.payload as any;
        state.isLoading = false;
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
