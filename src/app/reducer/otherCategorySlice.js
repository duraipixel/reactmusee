import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading: false,
    browse: [],
    error: ''
}

export const fetchBrowseCategory = createAsyncThunk('browse/fetchBrowseCategory', (category) => {
    console.log( category, 'category params');
    return axios({
        url: window.API_URL + '/get/other/category',
        method: 'POST',
        data: {category:category},
    }).then((res) => res.data ).catch((err) => {
    })

})

export const otherCategorySlice = createSlice({
    name: 'browse',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(fetchBrowseCategory.fulfilled, (state, action) => {
            state.loading = false
            state.browse = action.payload
            state.error = ''
        }).addCase(fetchBrowseCategory.pending, (state, action) => {
            state.loading = true
            state.browse = []
            state.error = ''
        }).addCase(fetchBrowseCategory.rejected, (state, action) => {
            state.loading = true
            state.browse = []
            state.error = ''
        })
    }
})

export default otherCategorySlice.reducer
