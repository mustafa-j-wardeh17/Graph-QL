import { createSlice } from "@reduxjs/toolkit";

type AuthUser = {
    id: number;
    fullName: string;
    email: string;
    picture: string;
};
interface AuthState {
    isAuthenticated: boolean;
    authUser: AuthUser | null;
}

const initialState: AuthState = {
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