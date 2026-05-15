import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userGrowthThunk = createAsyncThunk(
  "dashboard/user-growth",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.get("/api/admin/dashboard/growth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data
    } 
    catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      }
      return rejectWithValue("Error during get user growth");
    }
  },
);
