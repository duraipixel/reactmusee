import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    menus: [],
    error: ''
}

export const fetchMenus = createAsyncThunk('menus/fetchMenus', () => {
    return fetch(window.API_URL+'/get/allMenu')
                .then((response) => response.json())
                .then((data) => data.data)
                .catch((err) => {
                    console.log(err.message)
                });
})

export const menuSlice = createSlice({
    name: 'menus',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(fetchMenus.fulfilled, (state, action) => {
            
            state.loading = false
            state.menus = action.payload
            state.error = ''
        })
    }
})

export default menuSlice.reducer
