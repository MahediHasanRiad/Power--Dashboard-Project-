import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ResolvedMessageReportThunkType {
  id: number;
  selectedResolve:
    | "ACTIVE"
    | "PENDING"
    | "DEACTIVE"
    | "SUSPEND"
    | "DELETE"
    | "DISMISS_REPORT";
}

export const ResolvedMessageReportThunk = createAsyncThunk(
  "report/resolvedMessageReport",
  async ({ id, selectedResolve }: ResolvedMessageReportThunkType,{ rejectWithValue },) => {
    try {
      const token = localStorage.getItem("access-token");

      const response = await axios.patch(
        `/api/message-reports/${id}/resolve`,
        { adminAction: selectedResolve },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("Error during Resolved message report !!!");
    }
  },
);
