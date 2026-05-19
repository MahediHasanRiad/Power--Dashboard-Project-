import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from '../feature/dashboard/redux/dashboard.slice'
import authReducer from '../feature/login/redux/auth.slice'
import reportReducer from '../feature/Reporting/redux/user-report.slice'
import cmsReducer from '../feature/CMS/redux/CMS.slice'
import userManagerReducer from '../feature/user-manager/redux/user-manager.slice'
import FAQReducer from '../feature/FAQ/redux/FAQ.slice'
import ArticleReducer from '../feature/Article/redux/article.slice'



export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    report: reportReducer,
    cms: cmsReducer,
    userManager: userManagerReducer,
    FAQ: FAQReducer,
    article: ArticleReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch