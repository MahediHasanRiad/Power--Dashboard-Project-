import { createSlice } from "@reduxjs/toolkit";
import { adminStatusThunk } from "./admin-status.thunk";

// interface statusType {
//   total_users: number,
//   active_users: number,
//   pending_users: number,
//   total_growth_pct: number,
//   active_growth_pct: number,
//   pending_growth_pct: number
// }

const initialState = {
  data: null,
  isLoading: false,
  isError: null as any | null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // status
    builder
      .addCase(adminStatusThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(adminStatusThunk.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isError = null;
        state.isLoading = false;
      })
      .addCase(adminStatusThunk.rejected, (state, action) => {
        state.isError = action.payload as unknown | null;
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;
