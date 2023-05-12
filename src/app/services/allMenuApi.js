import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const allMenuApi = createApi({
    reducerPath: 'allMenuApi',
    baseQuery: fetchBaseQuery({ baseUrl:window.API_URL}),
    tagTypes: ['allMenuApi'],
    endpoints: (builder) => ({
        allMenu: builder.query({
            query:() => '/get/allMenu',
            providesTags: ['allMenuApi']
        }),
        increase: builder.mutation({
            query: ({ ing }) => {
              return {
                url: `/get/allMenu`,
                method: "PATCH",                
              };
            },
        })
    })
})

export const { useAllMenuQuery } = allMenuApi;
