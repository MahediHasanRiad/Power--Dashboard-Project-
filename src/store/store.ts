import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from '../feature/dashboard/redux/dashboard.slice'
import authSlice from '../feature/login/redux/auth.slice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    dashboard: dashboardReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch