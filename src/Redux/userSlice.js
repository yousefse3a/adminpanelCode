import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./api";

const initialState = {
    Users: null,
    loading: null,
    error: false,
}


export const allUsers = createAsyncThunk("users/get", async (adminToken) => {
    let  {data}  = await axios.get(`${baseUrl}/users`, {
        headers: {
            authorization: `Bearer ${adminToken}`,
        }
    });
    return data;
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        deleteUser: (state, action) => void (
            state.Users = state.Users.filter((User) => User._id !== action.payload)
        )
    },
    extraReducers: {
        [allUsers.pending]: (state, action) => {
            state.loading = true;
        },
        [allUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.Users = action.payload
            state.error = null

        },
        [allUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            state.Users = null;
        }
    }
})

export const { updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;