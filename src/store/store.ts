import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from '../feature/dashboard/redux/dashboard.slice'
import authReduter from '../feature/login/redux/auth.slice'
import userReportReducer from '../feature/Reporting/redux/user-report.slice'
import cmsReducer from '../feature/CMS/redux/CMS.slice'
import userManagerReducer from '../feature/user-manager/redux/user-manager.slice'

export const store = configureStore({
  reducer: {
    auth: authReduter,
    dashboard: dashboardReducer,
    userReport: userReportReducer,
    cms: cmsReducer,
    userManager: userManagerReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch