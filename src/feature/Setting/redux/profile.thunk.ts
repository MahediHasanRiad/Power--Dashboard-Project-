import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { initialValueType } from "../profile.page";

export const updateProfileThunk = createAsyncThunk('profile/update', async(data: initialValueType, {rejectWithValue}) => {
  try {

    const payload = {
        ...data,
        longitude: data.longitude ? Number(data.longitude) : undefined,
        latitude: data.latitude ? Number(data.latitude) : undefined,
      };

    const token = localStorage.getItem("access-token");
    const response = await axios.put('/api/users/profile', payload, {
      headers: {
          Authorization: `Bearer ${token}`,
        },
    })

    return response.data
  } 
  catch (error: unknown) {
    if(axios.isAxiosError(error)){
      return rejectWithValue(error.response?.data || error.message)
    }
    return rejectWithValue('Error during update profile')
  }
})