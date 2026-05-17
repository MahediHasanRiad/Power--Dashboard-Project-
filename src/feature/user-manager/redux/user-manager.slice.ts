import { createSlice } from "@reduxjs/toolkit";
import { userManagerThunk } from "./user-manager.thunk";
import { updateStatusThunk } from "./updateStatus.thunk";
import type { userManagerType } from "../utils/user-management-type";



const initialState: userManagerType = {
  data: null,
  accountStatus: {
    user_id: "",
    accountStatus: "PENDING",
  },
  isLoading: false,
  isError: null,
};

const userManagerSlice = createSlice({
  name: "userManager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get user manager data
    builder
      .addCase(userManagerThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(userManagerThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isError = null;
        state.isLoading = false;
      })
      .addCase(userManagerThunk.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      });

    // update status
    builder
      .addCase(updateStatusThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateStatusThunk.fulfilled, (state, action) => {
        state.accountStatus = action.payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(updateStatusThunk.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      });
  },
});

export const {} = userManagerSlice.actions;
export default userManagerSlice.reducer;
