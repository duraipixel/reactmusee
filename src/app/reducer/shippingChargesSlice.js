import { createSlice } from '@reduxjs/toolkit'

export const shippingChargesSlice = createSlice({
    name: 'charges',
    initialState: {
      value: [],
    },
    reducers: {
      setShippingCharges: (state, action ) => {
        console.log('action', action);
        state.value = {...action.payload};
        
      }
    },
  })
  
  export const { setShippingCharges } = shippingChargesSlice.actions
  
  export default shippingChargesSlice.reducer
  