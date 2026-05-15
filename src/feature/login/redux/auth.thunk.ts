import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { InputType } from "../login.page";

export const authThunk = createAsyncThunk('auth/login', async(formData: InputType, {rejectWithValue}) => {
    try {
        
        const response = await axios.post('/api/auth/login', formData)
        return response.data;

    } catch (error: unknown) {
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data.message || error.message)
        }
        return rejectWithValue('Error during login')
    }
})