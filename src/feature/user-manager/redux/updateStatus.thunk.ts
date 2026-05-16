import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface statusThunkType {
  userId: string;
  currentStatus: "PENDING" | "ACTIVE" | "REJECTED";
}

export const updateStatusThunk = createAsyncThunk(
  "userManager/updateStatus",
  async ({ userId, currentStatus }: statusThunkType, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.patch(
        `/api/admin/users/${userId}/status`,
        {
          accountStatus: currentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue("Error during update status");
    }
  },
);
