import GoogleButton from "react-google-button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthUser, setIsAuthenticated } from '../../redux/auth/authSlice';

const Login = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Effect to redirect authenticated users to the home page
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // Redirect to home if authenticated
        }
    }, [isAuthenticated, navigate]);

    // Function to verify the user's OAuth token
    const verifyOAuth = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/verifytoken', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Include cookies in the request
            });

            // Handle response and update authentication state
            if (response.ok) {
                const userProfile = await response.json();
                console.log('User Profile:', userProfile); // Log the user profile

                // Dispatch actions to update authentication state
                dispatch(setIsAuthenticated(true));
                dispatch(setAuthUser(userProfile));
            } else {
                console.error('Failed to verify OAuth:', response.statusText);
            }
        } catch (error) {
            console.error('Error verifying OAuth:', error);
        }
    };

    // Function to initiate Google SSO
    const redirectGoogleSSO = () => {
        const googleLoginUrl = 'http://localhost:5000/api/v1/auth/google/login';
        const newWindow = window.open(googleLoginUrl, "__blank", "width=500,height=600");

        if (newWindow) {
            const timer = setInterval(async () => {
                if (newWindow.closed) {
                    console.log('New window closed, verifying OAuth...');
                    await verifyOAuth(); // Verify the token after the window is closed
                    clearInterval(timer); // Clear the timer
                }
            }, 500);
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-neutral-800">
            <GoogleButton onClick={redirectGoogleSSO} />
        </div>
    );
};

export default Login;
