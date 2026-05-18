import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllArticleThunk = createAsyncThunk("Article/get-all", async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.get("/api/articles/", {
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
      return rejectWithValue("Error during Fetch all articles");
    }
  },
);
