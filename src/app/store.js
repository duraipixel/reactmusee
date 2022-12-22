import { configureStore } from '@reduxjs/toolkit'
import sideMenuBarReducer from './reducer/sideMenuBarSlice'
import topMenuSlice from './reducer/topMenuSlice'

export const store = configureStore({
  reducer: {
    'sideMenuBar':sideMenuBarReducer,
    'topmenu':topMenuSlice
  },
})