import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const createArticleThunk = createAsyncThunk(
  "article/create",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      console.log(formData)
      const response = await axios.post("/api/articles/", formData, {
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
      return rejectWithValue("Error during Create an article !!!");
    }
  },
);
