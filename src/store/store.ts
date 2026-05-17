import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from '../feature/dashboard/redux/dashboard.slice'
import authReducer from '../feature/login/redux/auth.slice'
import userReportReducer from '../feature/Reporting/redux/user-report.slice'
import cmsReducer from '../feature/CMS/redux/CMS.slice'
import userManagerReducer from '../feature/user-manager/redux/user-manager.slice'
import FAQReducer from '../feature/FAQ/redux/FAQ.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    userReport: userReportReducer,
    cms: cmsReducer,
    userManager: userManagerReducer,
    FAQ: FAQReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch