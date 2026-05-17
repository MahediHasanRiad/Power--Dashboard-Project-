import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { roleType } from "../utils/user-management-type";



export type userManagerThunkType = {
  role: roleType;
  page: number;
  page_size: number
} 

export const userManagerThunk = createAsyncThunk('userManager/filter', async ({role, page, page_size}: userManagerThunkType, {rejectWithValue}) => {
  try {
    const token = localStorage.getItem("access-token");
    const response = await axios.get(`/api/admin/users?role=${role}&page=${page}&page_size=${page_size}`, {
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