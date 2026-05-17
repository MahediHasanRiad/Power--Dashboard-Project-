import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { FAQType } from "../FAQ.page";

export interface UpdateFAQThunkType {
  id: number;
  inputValue: {
    question: string;
    answer: string;
    category: FAQType;
  };
}

export const UpdateFAQThunk = createAsyncThunk( "FAQ/edit", async ({ id, inputValue }: UpdateFAQThunkType, { rejectWithValue }) => {
    try {
      console.log('update thunk', id, inputValue);
      const token = localStorage.getItem("access-token");
      const response = await axios.patch(`/api/faq/${id}`, inputValue, {
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
      return rejectWithValue("Error during update FAQ !!!");
    }
  },
);
