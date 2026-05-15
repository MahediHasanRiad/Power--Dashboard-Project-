import { createSlice } from "@reduxjs/toolkit";
import { cmsThunk } from "./cms.thunk";

interface cmsType {
  data: string | null;
  isLoading: boolean;
  isError: any;
}

const initialState: cmsType = {
  data: null,
  isLoading: false,
  isError: null
}

const cmsSlice = createSlice({
  name: 'cmsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(cmsThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    }).addCase(cmsThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isError = null;
      state.isLoading = false;
    }).addCase(cmsThunk.rejected, (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;

    })
  }
})


export const {} = cmsSlice.actions;
export default cmsSlice.reducer