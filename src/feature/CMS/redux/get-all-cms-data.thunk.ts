import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAllCMSDataThunk = createAsyncThunk(
  "cms/getData", async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.get("/api/settings/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data
    } 
    catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message)
      }
      return rejectWithValue('Error during get All CMS data')
    }
  },
);
