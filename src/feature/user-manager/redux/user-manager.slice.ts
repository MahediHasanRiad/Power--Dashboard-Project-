import { createSlice } from "@reduxjs/toolkit";
import { userManagerThunk } from "./user-manager.thunk";
import { updateStatusThunk } from "./updateStatus.thunk";
import type { userManagerType } from "../utils/user-management-type";

const initialState: userManagerType = {
  data: null, // Assuming this contains an array of users, e.g., state.data.users
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
    // 1. GET USER MANAGER DATA
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

    // 2. UPDATE STATUS (With inline state updates)
    builder
      .addCase(updateStatusThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateStatusThunk.fulfilled, (state, action) => {
        state.accountStatus = action.payload;
        state.isLoading = false;
        state.isError = null;

        // --- AUTOMATIC UPDATE LOGIC ---
        // Extract the updated values (adjust keys based on what your backend returns)
        const updatedUserId = action.payload.user_id || action.meta.arg.userId;
        const newStatus = action.payload.accountStatus || action.meta.arg.currentStatus;

        // Check if state.data and your users array exist
        if (state.data && Array.isArray(state.data.users)) {
          // Find the specific user in the current table data list
          const userIndex = state.data.users.findIndex(
            (user: any) => user.id === updatedUserId
          );

          // If found, change their status in Redux memory. React will instantly redraw that row!
          if (userIndex !== -1) {
            state.data.users[userIndex].accountStatus = newStatus; // Adjust '.status' to match your data property name
          }
        }
        // ------------------------------
      })
      .addCase(updateStatusThunk.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      });
  },
});


export const {} = userManagerSlice.actions;
export default userManagerSlice.reducer;
