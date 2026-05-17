import { createSlice } from "@reduxjs/toolkit";
import { GetAllFAQThunk } from "./get-all-faq-data.thunk";
import type { FAQType } from "../FAQ.page";

export interface FaqItemType {
  id: string;
  question: string;
  answer: string;
  category: FAQType;
}

interface FAQSliceType {
  data: FaqItemType[] | null;
  isLoading: boolean;
  isError: any;
}

const initialState: FAQSliceType = {
  data: null,
  isLoading: false,
  isError: null,
};

const FAQSlice = createSlice({
  name: "FAQ",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // get all FAQ data
    builder
      .addCase(GetAllFAQThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(GetAllFAQThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.data = action.payload;
      })
      .addCase(GetAllFAQThunk.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      });

    // create FAQ
    
  },
});

export const {} = FAQSlice.actions;
export default FAQSlice.reducer;
