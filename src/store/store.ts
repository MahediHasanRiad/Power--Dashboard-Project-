import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from '../feature/dashboard/redux/dashboard.slice'
import authReduter from '../feature/login/redux/auth.slice'
import userReportReducer from '../feature/Reporting/redux/user-report.slice'

export const store = configureStore({
  reducer: {
    auth: authReduter,
    dashboard: dashboardReducer,
    userReport: userReportReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch