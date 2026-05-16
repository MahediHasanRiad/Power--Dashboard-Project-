import { createSlice } from "@reduxjs/toolkit";
import { adminStatusThunk } from "./admin-status.thunk";
import { userGrowthThunk } from "./user-growth.thunk";

interface statusType {
  data: {
    total_users: number | string;
    active_users: number | string;
    pending_users: number | string;
    total_growth_pct: number | string;
    active_growth_pct: number | string;
    pending_growth_pct: number | string;
  } | null;
  growth: {
    label: string;
    count: number;
  }[] | null;
  isLoading: boolean;
  isError: any;
}

const initialState: statusType = {
  data: null,
  growth: null,
  isLoading: false,
  isError: null,
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
        state.data = action.payload;
        state.isError = null;
        state.isLoading = false;
      })
      .addCase(adminStatusThunk.rejected, (state, action) => {
        state.isError = action.payload as unknown | null;
        state.isLoading = false;
      });

    // user growth
    builder
      .addCase(userGrowthThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(userGrowthThunk.fulfilled, (state, action) => {
        state.growth = action.payload;
        state.isError = null;
        state.isLoading = false;
      })
      .addCase(userGrowthThunk.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = dashboardSlice.actions;
export default dashboardSlice.reducer;
