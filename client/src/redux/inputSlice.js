import { createSlice } from "@reduxjs/toolkit";

const inputSlice = createSlice({
    name: 'inputSlice',
    initialState: { login: '' },
    reducers: {
        updateLogin(state, { payload }) {
            return {
                ...state,
                login: payload
            }
        }
    }
});

export const { updateLogin } = inputSlice.actions;
export default inputSlice.reducer;