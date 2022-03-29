import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie, setCookie } from '../helpers/cookies';

export const apiService = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        prepareHeaders: (headers, { getState }) => {
            if (getCookie('token')) {
                headers.set('token', getCookie('token'))
            }
            return headers
        }
    }),
    endpoints: build => ({
        getAuthToken: build.query({
            query: () => '/auth'
        }),
        getUserByLogin: build.query({
            query: login => `/user/${login}`
        }),
        getLangsByLogin: build.query({
            query: login => `/langs/${login}`
        }),
    })
});

export const {
    useGetAuthTokenQuery,
    useGetUserByLoginQuery,
    useGetLangsByLoginQuery
} = apiService;