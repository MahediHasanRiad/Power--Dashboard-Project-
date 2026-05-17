import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { FAQType } from "../FAQ.page";

export const GetAllFAQThunk = createAsyncThunk("faq/getAll", async (activeFilter: FAQType, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/faq/?category=${activeFilter}`);
      console.log('re-thunk', response.data)
      return response.data;
    } 
    catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("Error during get FAQ data");
    }
  },
);
