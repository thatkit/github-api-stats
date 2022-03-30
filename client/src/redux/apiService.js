import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie, setCookie } from '../helpers/cookies';

export const apiService = createApi({
    reducerPath: 'apiService',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        prepareHeaders: (headers, { getState }) => {
            console.log(getState().authSlice.authToken)
            // if (getState().authSlice.authToken) {
                headers.set('token', getState().authSlice.authToken);
            // }
            return headers;
        }
    }),
    endpoints: build => ({
        getAuthToken: build.mutation({
            query: () => ({
                url: '/auth',
                method: 'POST',
                headers: (headers) => {
                    delete headers.token;
                    return headers;
                }
            })
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
    useGetAuthTokenMutation,
    useGetUserByLoginQuery,
    useGetLangsByLoginQuery
} = apiService;

// # if no token logic