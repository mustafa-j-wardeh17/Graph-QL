import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    isAuthenticated: false,
    authUser: null,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
    setAuthUser: (state, action) => {
        state.authUser = action.payload;
    },
    setIsAuthenticated: (state, action) => {
        state.isAuthenticated = action.payload
    },

}
})

// Action creators are generated for each case reducer function
export const { setAuthUser, setIsAuthenticated } = authSlice.actions

export default authSlice.reducer