import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from '../feature/dashboard/redux/dashboard.slice'

export default configureStore({
  reducer: {
    dashboard: dashboardReducer
  }
})