import { createSlice } from "@reduxjs/toolkit";
import { userManagerThunk } from "./user-manager.thunk";

export type UserType = {
  id: string
  fullname: string
  email: string
  isVerified: boolean
  accountStatus: string
  roles: "Courier" | "Buyer" | "Provider" | "Seller"
  displayname: string
  bio: string
  longitude: number
  latitude: number
  profile_image: string
}

export type userManagerType = {
  data: UserType[] | null
  isLoading: boolean
  isError: any
}

const initialState : userManagerType = {
  data: null,
  isLoading: false,
  isError: null
}

const userManagerSlice = createSlice({
  name: 'userManager',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get user manager data 
    builder.addCase(userManagerThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    }).addCase(userManagerThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isError = null;
      state.isLoading = false;
    }).addCase(userManagerThunk.rejected, (state, action) => {
      state.isError = action.payload;
      state.isLoading = false
    })
  }
})


export const {} = userManagerSlice.actions;
export default userManagerSlice.reducer;