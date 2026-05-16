import { createSlice } from "@reduxjs/toolkit";
import { cmsThunk } from "./cms.thunk";
import type { CMSPageType } from "../cms-type";
import { GetAllCMSDataThunk } from "./get-all-cms-data.thunk";

interface CMPDataType {
  id: string;
  title: CMSPageType;
  content: any;
}

interface cmsType {
  data: CMPDataType[] | null;
  isLoading: boolean;
  isError: any;
}

const initialState: cmsType = {
  data: null,
  isLoading: false,
  isError: null,
};

const cmsSlice = createSlice({
  name: "cmsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all data
    builder
      .addCase(GetAllCMSDataThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(GetAllCMSDataThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        console.log('slice', action.payload)
        state.data = action.payload;
      })
      .addCase(GetAllCMSDataThunk.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      });

    // update cms data
    builder
      .addCase(cmsThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(cmsThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isError = null;
        state.isLoading = false;
      })
      .addCase(cmsThunk.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      });
  },
});

export const {} = cmsSlice.actions;
export default cmsSlice.reducer;
