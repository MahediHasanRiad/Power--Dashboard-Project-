import { createSlice } from "@reduxjs/toolkit";
import { userReportThunk } from "./user-report.thunk";
import type { userReportType } from "../report-type";


const initialState: userReportType = {
  data: null,
  isLoading: false,
  isError: null,
};

export const userReportSlice = createSlice({
  name: "userReport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // users report
    builder
      .addCase(userReportThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(userReportThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isError = null;
        state.isLoading = false;
      })
      .addCase(userReportThunk.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      });
  },
});

export const {} = userReportSlice.actions;
export default userReportSlice.reducer;
