import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type roleType = "ALL" | "ADMIN" | "USER" | "SELLER" | "Courier" | "SERVICE_PROVIDER"

export const userManagerThunk = createAsyncThunk('userManager/filter', async (role: roleType, {rejectWithValue}) => {
  try {
    const token = localStorage.getItem("access-token");
    const response = await axios.get(`/api/admin/users?role=${role}`, {
      headers: {
          Authorization: `Bearer ${token}`,
        },
    })
    return response.data
  } 
  catch (error: unknown) {
    if(axios.isAxiosError(error)){
      return rejectWithValue(error.response?.data)
    }
    return rejectWithValue('Error during fetch User manager data')
  }
})