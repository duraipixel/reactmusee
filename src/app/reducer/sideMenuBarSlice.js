import { createSlice } from '@reduxjs/toolkit'

export const sideMenuBarSlice = createSlice({
  name: 'sideMenuBar',
  initialState: {
    value: false,
  },
  reducers: {
    isOpenSideBar: (state, action ) => {
      state.value = !state.value;
    }
  },
})

export const { isOpenSideBar } = sideMenuBarSlice.actions

export default sideMenuBarSlice.reducer
