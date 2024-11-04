import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setAuthUser, setIsAuthenticated } from "../redux/auth/authSlice";
import { NavigateFunction } from "react-router-dom";

export const verifyOAuth = async (dispatch: Dispatch<UnknownAction>, navigate: NavigateFunction) => {
    try {
        const response = await fetch('http://localhost:5000/api/v1/auth/verifytoken', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Include cookies in the request
        });

        if (response.ok) {
            const userProfile = await response.json();
            console.log('User Profile:', userProfile);

            // Dispatch actions to update authentication state
            dispatch(setIsAuthenticated(true));
            dispatch(setAuthUser(userProfile));

            // Navigate after setting the auth state
            navigate('/');
        } else {
            navigate('/login');
            console.error('Failed to verify OAuth:', response.statusText);
        }
    } catch (error) {
        console.error('Error verifying OAuth:', error);
    }
};
