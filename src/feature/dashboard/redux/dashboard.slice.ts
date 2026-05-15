import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {},

})

// Action creators are generated for each case reducer function
export const {  } = dashboardSlice.actions

export default dashboardSlice.reducer