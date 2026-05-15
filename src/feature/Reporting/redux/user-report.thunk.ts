import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userReportThunk = createAsyncThunk(
  "report/user-report",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.get("/api/reports/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('res-thunk', response.data)
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
