import { createSlice } from '@reduxjs/toolkit'

export const topMenuSlice = createSlice({
  name: 'topmenu',
  initialState: {
    value: [],
  },
  reducers: {
    setTopmenu: (state, action ) => {
      state.value = state.value;
      console.log(state.value);
    }
  },
})

export const { setTopmenu } = topMenuSlice.actions

export default topMenuSlice.reducer
