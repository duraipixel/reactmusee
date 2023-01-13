import { createSlice } from '@reduxjs/toolkit'

export const paymentResponseSlice = createSlice({
  name: 'payment_response',
  initialState: {
    value: '',
  },
  reducers: {
    setPaymentResponse: (state, action ) => {
        console.log(state, 'state');
        console.log(action, 'action');
        state.value = {...action.payload};
    }
  },
})

export const { setPaymentResponse } = paymentResponseSlice.actions

export default paymentResponseSlice.reducer
