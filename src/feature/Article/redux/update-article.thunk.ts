import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface updateArticleThunkType {
  id: number;
  formData: FormData;
}

export const updateArticleThunk = createAsyncThunk(
  "article/update",
  async ({ id, formData }: updateArticleThunkType, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.patch(`/api/articles/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("Error during update article !!!");
    }
  },
);
