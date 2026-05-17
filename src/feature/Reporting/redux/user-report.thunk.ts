import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface userReportThunkType {
  page: number;
  page_size: number
}

export const userReportThunk = createAsyncThunk(
  "report/user-report",
  async ({page, page_size}: userReportThunkType, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.get(`/api/reports/?&page=${page}&page_size=${page_size}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data
    } 
    catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      }
      return rejectWithValue("Error during fetch users report");
    }
  },
);
