import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        prepareHeaders: (headers, arg) => {
            console.log(arg)
            headers.set('Access-Control-Allow-Origin', '*');
            console.log(headers)
            return headers
        }
    }),
    endpoints: build => ({
        getUserByLogin: build.query({
            query: login => `/user/${login}`
        }),
        getLangsByLogin: build.query({
            query: login => `/langs/${login}`
        }),
    })
});

export const {
    useGetUserByLoginQuery,
    useGetLangsByLoginQuery
} = apiSlice;