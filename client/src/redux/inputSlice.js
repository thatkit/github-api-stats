import { createSlice } from "@reduxjs/toolkit";

const inputSlice = createSlice({
    name: 'inputSlice',
    initialState: {
        login: '',
        errorMes: ''
    },
    reducers: {
        updateLogin(state, { payload }) {
            return {
                ...state,
                login: payload
            }
        },
        updateErrorMes(state, { payload }) {
            return {
                ...state,
                errorMes: payload
            }
        },
    }
});

export const {
    updateLogin,
    updateErrorMes
} = inputSlice.actions;
export default inputSlice.reducer;