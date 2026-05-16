import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProfileImage = createAsyncThunk('profile/update-image', async (FormData, {rejectWithValue}) => {
  try {
    
    

  } catch (error: unknown) {
    if(axios.isAxiosError(error)){
      return rejectWithValue(error.response?.data || error.message)
    }
    return rejectWithValue('Error during update profile image')
  }
})