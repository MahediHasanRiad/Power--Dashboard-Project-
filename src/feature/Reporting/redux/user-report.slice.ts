import { createSlice } from "@reduxjs/toolkit";
import { userReportThunk } from "./user-report.thunk";
import type { userReportSliceType } from "../report-type";
import { GetAllMessageReportThunk } from "./get-all-message-report.thunk";

const initialState: userReportSliceType = {
  data: null,
  messageReport: null,
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

    // get all messaging report data
    builder
      .addCase(GetAllMessageReportThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(GetAllMessageReportThunk.fulfilled, (state, action) => {
        state.isError = null;
        state.isLoading = false;
        state.messageReport = action.payload;
      })
      .addCase(GetAllMessageReportThunk.rejected, (state, action) => {
        ((state.isError = action.payload), (state.isLoading = false));
      });
  },
});

export const {} = userReportSlice.actions;
export default userReportSlice.reducer;
