import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userManagerThunk = createAsyncThunk('userManager/filter', async (_, {rejectWithValue}) => {
  try {
    const token = localStorage.getItem("access-token");
    const response = await axios.get('/api/admin/users', {
      headers: {
          Authorization: `Bearer ${token}`,
        },
    })
console.log('res', response.data)
    return response.data
  } 
  catch (error: unknown) {
    if(axios.isAxiosError(error)){
      return rejectWithValue(error.response?.data)
    }
    return rejectWithValue('Error during fetch User manager data')
  }
})