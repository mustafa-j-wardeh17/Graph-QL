import GoogleButton from "react-google-button";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOAuth } from '../../util/verifyUser'
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Function to initiate Google SSO
    const redirectGoogleSSO = async () => {
        window.location.href = 'http://localhost:5000/api/v1/auth/google/login'
    };


    // Effect to redirect authenticated users to the home page
    useEffect(() => {
        const checkAuth = async () => {
            await verifyOAuth(dispatch, navigate);
        };
        checkAuth();
    }, []);

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-neutral-800">
            <GoogleButton onClick={redirectGoogleSSO} />
        </div>
    );
};

export default Login;
