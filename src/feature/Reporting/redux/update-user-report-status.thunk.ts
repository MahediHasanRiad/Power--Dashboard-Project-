import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface updateArticleThunkType {
  id: number;
  status: string;
}

export const updateUserReportThunk = createAsyncThunk(
  "report/updateStatus",
  async ({ id, status }: updateArticleThunkType, { rejectWithValue }) => {
    try {
        console.log(id, status)
      const token = localStorage.getItem("access-token");
      const response = await axios.patch(
        `reports/${id}/resolve`,
        {
          body: {
            adminAction: status,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data
    } 
    catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("Error during Update user report status !!!");
    }
  },
);
