import { createSlice } from "@reduxjs/toolkit";
import { GetAllFAQThunk } from "./get-all-faq-data.thunk";
import type { FAQType } from "../FAQ.page";
import { DeleteFAQThunk } from "./delete-FAQ.thunk";
import { createFAQthunk } from "./create-FAQ.thunk";
import { UpdateFAQThunk } from "./update-FAQ.thunk";

export interface FaqItemType {
  id: number;
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
      })

      // HANDLE CREATE RE-COMPOUND LOCALLY:
      .addCase(createFAQthunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = [...(state.data ?? []), action.payload];
      })

      // 🚀 HANDLE UPDATE RE-COMPOUND LOCALLY:
      .addCase(UpdateFAQThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        
        const updatedItem = action.payload; 
        state.data = (state.data ?? []).map((item) => 
          item.id === updatedItem.id ? updatedItem : item
        );
      })

      // auto mound after delete
      .addCase(DeleteFAQThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedId = action.meta.arg; // autho mound after delete
        state.data = state.data?.filter((item) => item.id !== deletedId) ?? [];
      });
  },
});

export const {} = FAQSlice.actions;
export default FAQSlice.reducer;
