import { createSlice } from "@reduxjs/toolkit";
import { userReportThunk } from "./user-report.thunk";
import type { reportSliceType } from "../report-type";
import { GetAllMessageReportThunk } from "./get-all-message-report.thunk";
import { ResolvedMessageReportThunk } from "./resolve-message-reports.thunk";
import { updateUserReportThunk } from "./update-user-report-status.thunk";

const initialState: reportSliceType = {
  data: null,
  messageReport: null,
  isLoading: false,
  isError: null,
};

export const reportSlice = createSlice({
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
        console.log(action.payload)
        state.messageReport = action.payload;
      })
      .addCase(GetAllMessageReportThunk.rejected, (state, action) => {
        ((state.isError = action.payload), (state.isLoading = false));
      })


      // auto render when update
      builder.addCase(ResolvedMessageReportThunk.fulfilled, (state, action) => {
      const reportId = action.meta.arg.id;
      const newStatus = action.meta.arg.selectedResolve;

      const targetReport = state.messageReport?.reports.find(
        (report: any) => report.id === reportId
      );

      if (targetReport) {
        targetReport.status = newStatus; 
      }})


      // auto render when update
      builder.addCase(updateUserReportThunk.fulfilled, (state, action) => {
      const reportId = action.meta.arg.id;
      const newStatus = action.meta.arg.status;

      const targetReport = state.data?.reports.find(
        (report: any) => report.id === reportId
      );

      if (targetReport) {
        targetReport.status = newStatus; 
      }})


  },
});

export const {} = reportSlice.actions;
export default reportSlice.reducer;
