import { createSlice } from "@reduxjs/toolkit";
import { createArticleThunk } from "./create-article.thunk";
import type { articleSliceType } from "../article-type";
import { getAllArticleThunk } from "./get-all-article.thunk";
import { deleteArticleThunk } from "./delete-article.thunk";
import { updateArticleThunk } from "./update-article.thunk";

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
    // get all article
    builder
      .addCase(getAllArticleThunk.pending, (state) => {
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(getAllArticleThunk.fulfilled, (state, action) => {
        state.isError = null;
        state.isLoading = false;

        state.articles = action.payload;
      })
      .addCase(getAllArticleThunk.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      });

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
      })

      // autho mound after delete
      .addCase(deleteArticleThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // const deletedId = action.meta.arg; // autho mound after delete
        const deletedId = action.payload; // autho mound after delete
        state.articles =
          state?.articles?.filter((item) => item.id !== deletedId) ?? [];
      })

      // 🚀 HANDLE UPDATE RE-COMPOUND LOCALLY:
      .addCase(updateArticleThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        const updatedItem = action.payload;
        state.articles = (state.articles ?? []).map((item) =>
          item.id === updatedItem.id ? updatedItem : item,
        );
      });
  },
});

export const {} = articleSlice.actions;
export default articleSlice.reducer;
