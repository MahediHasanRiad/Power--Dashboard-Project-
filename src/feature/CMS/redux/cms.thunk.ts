import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const cmsThunk = createAsyncThunk(
  "cms/create",
  async (content: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      console.log("Sending:", { content });
      const response = await axios.post(
        "/api/settings/",
        {
          title: "TERMS_CONDITION",
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
