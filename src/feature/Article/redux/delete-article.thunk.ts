import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteArticleThunk = createAsyncThunk(
  "article/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.delete(`/api/articles/${id}`, {
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
      return rejectWithValue("Error during delete article !!!");
    }
  },
);
