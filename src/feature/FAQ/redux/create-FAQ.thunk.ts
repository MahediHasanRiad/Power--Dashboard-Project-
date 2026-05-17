import type { CreateFAQInitialValueType } from "@/shared/dialog-box-(create)";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const createFAQthunk = createAsyncThunk(
  "FAQ/create",
  async (inputValue: CreateFAQInitialValueType, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.post("/api/faq/", inputValue, {
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
      return rejectWithValue("Error during create FAQ");
    }
  },
);
