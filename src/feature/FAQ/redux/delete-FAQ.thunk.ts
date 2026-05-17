import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const DeleteFAQThunk = createAsyncThunk( "FAQ/delete", async (id: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.delete(`/api/faq/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } 
    catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("Error during FAQ Delete !!!");
    }
  },
);
