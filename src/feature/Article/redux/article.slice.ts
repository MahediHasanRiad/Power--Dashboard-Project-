import { createSlice } from "@reduxjs/toolkit";
import { createArticleThunk } from "./create-article.thunk";
import type { articleSliceType } from "../article-type";



const initialState: articleSliceType = {
  article: null,
  articles: null,
  isLoading: false,
  isError: null,
};

const articleSlice = createSlice({
  name: "Article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    // after create a new article, update automatically in list with out refresh
    builder
      .addCase(createArticleThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createArticleThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // Append the newly created article directly into your current items array
        state.articles = [...(state.articles ?? []), action.payload];
      })
      .addCase(createArticleThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {} = articleSlice.actions;
export default articleSlice.reducer
