import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getAuthToken = createAsyncThunk(
    'auth/getAuthToken',
    async (arg, thunkAPI) => {
        const response = await fetch('http://localhost:5000/api/auth');
        console.log(thunkAPI);
        console.log(response);
        return response;
    }
);

const apiSlice = createSlice({
    name: 'apiSlice',
    initialState: {
        auth: { token: '' }
    },
    extraReducers: build => {
        build.addCase();
    }

});