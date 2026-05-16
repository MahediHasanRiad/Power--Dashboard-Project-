import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { CMSPageType } from "../cms-type";



interface cmsThunkType {
  id: string;
  title: CMSPageType;
  content: string;
}

export const cmsThunk = createAsyncThunk(
  "cms/create",
  async ({ id, title, content }: cmsThunkType, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      console.log("Sending:", { id, title, content });

      const response = await axios.put(
        `/api/settings/${id}`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue("Error during CMS create");
    }
  },
);
