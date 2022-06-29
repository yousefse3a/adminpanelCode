import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Login } from "./api";
import jwt_decode from "jwt-decode";

const initialState = {
    adminToken: null,
    admin: null,
    loading: null,
    error: false,
}

export const adminAuth = createAsyncThunk("admins/get", async (admin, { rejectWithValue }) => {
    let response = await Login(admin);
    console.log(response)
    const userData = jwt_decode(response.userToken);
    if (userData && userData.role === 'admin') {
        localStorage.setItem("userToken", response.userToken);
        return { userData, userToken: response.userToken };
    } else if (userData && userData.role === 'user') {
        response.message = 'not auth';
        return rejectWithValue(response);
    }
    else {
        return rejectWithValue(response);
    }
});

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        Logout: (state, action) => {
            localStorage.removeItem("userToken");
            state.adminToken = null
            state.admin = null

        },
        refreshLogin(state, action) {
            const userData = jwt_decode(action.payload);
            state.adminToken = action.payload;
            state.admin = userData;
        },
        changeError(state, action) {
            state.error = false
        }
    },
    extraReducers: {
        [adminAuth.pending]: (state, action) => {
            state.loading = true;
            state.error = null
        },
        [adminAuth.fulfilled]: (state, action) => {
            state.loading = false;
            state.admin = action.payload.userData
            state.adminToken = action.payload.userToken;
            state.error = null

        },
        [adminAuth.rejected]: (state, action) => {
            state.loading = false;
            state.error = (action.payload) ? action.payload.message : "pass or email not correct";
            state.admin = null;
            state.adminToken = null;
        }
    }
})

export const { Logout, refreshLogin, changeError } = adminSlice.actions;

export default adminSlice.reducer;