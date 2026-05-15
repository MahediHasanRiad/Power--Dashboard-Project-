import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const adminStatusThunk = createAsyncThunk('dashboard/status', async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get('/api/admin/dashboard/stats', {withCredentials: true})
        console.log('res', response.data)
        return response.data
    } 
    catch (error: unknown) {
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data.message || error.message)
        }
        return rejectWithValue('Error during get Dashboard Status')
    }
})