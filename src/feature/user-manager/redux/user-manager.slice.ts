import { createSlice } from "@reduxjs/toolkit";
import { userManagerThunk } from "./user-manager.thunk";
import { updateStatusThunk } from "./updateStatus.thunk";

export type UserType = {
  id: string;
  fullname: string;
  email: string;
  isVerified: boolean;
  accountStatus: "PENDING" | "ACTIVE" | "REJECTED";
  roles: "ALL" | "USER" | "SELLER" | "SERVICE_PROVIDER";
  displayname: string;
  bio: string;
  longitude: number;
  latitude: number;
  profile_image: string;
  is_online: boolean;
  raw_score: number;
  trust_score: number;

};

export type getAllUserType = {
  page: number;
  page_size: number;
  total: number;
  users: UserType[] | null;
};

type statusType = {
  user_id: string;
  accountStatus: "PENDING" | "ACTIVE" | "REJECTED";
};

export type userManagerType = {
  data: getAllUserType  | null;
  accountStatus: statusType;
  isLoading: boolean;
  isError: any;
};

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
