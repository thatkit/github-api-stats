import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authSlice',
    initialState: { authToken: '' },
    reducers: {
        storeAuthToken(state, { payload }) {
            return {
                ...state,
                authToken: payload
            }
        }
    }
});

export const { storeAuthToken } = authSlice.actions;
export default authSlice.reducer;