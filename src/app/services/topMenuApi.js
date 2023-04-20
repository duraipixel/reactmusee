import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const topMenuApi = createApi({
    reducerPath: 'topMenuApi',
    baseQuery: fetchBaseQuery({ baseUrl:window.API_URL}),
    tagTypes: ['topMenuApi'],
    endpoints: (builder) => ({
        topMenu: builder.query({
            query:() => '/get/topMenu',
            providesTags: ['topMenuApi']
        }),
        increase: builder.mutation({
            query: ({ ing }) => {
              return {
                url: `/get/topMenu`,
                method: "PATCH",                
              };
            },
        })
    })
})

export const { useTopMenuQuery } = topMenuApi;
