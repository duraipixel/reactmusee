import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const topMenuApi = createApi({
    reducerPath: 'topMenuApi',
    baseQuery: fetchBaseQuery({ baseUrl:window.API_URL}),
    endpoints: (builder) => ({
        topMenu: builder.query({
            query:() => '/get/topMenu'
        })
    })
})

export const { useTopMenuQuery } = topMenuApi;
