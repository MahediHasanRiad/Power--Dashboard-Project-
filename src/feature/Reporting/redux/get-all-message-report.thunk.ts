import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAllMessageReportThunk = createAsyncThunk(
  "report/getAllMessageReport",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.get(`/api/message-reports/?page=1&page_size=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data
    } 
    catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("Error during get all message report data");
    }
  },
);
