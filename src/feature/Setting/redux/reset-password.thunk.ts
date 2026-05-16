import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { initialValueType } from "../reset-password.page";

export const restPasswordThunk = createAsyncThunk(
  "setting/resetPassword",
  async (inputValue: initialValueType, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.post(
        "/api/auth/reset-password",
        {
          token: token,
          new_password: inputValue.new_password,
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
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("Error during reset password");
    }
  },
);
