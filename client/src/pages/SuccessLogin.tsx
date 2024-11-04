import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated, setAuthUser } from '../../redux/auth/authSlice';
import { verifyOAuth } from '../../util/verifyUser';
import { useNavigate } from 'react-router-dom';

const SuccessLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            await verifyOAuth(dispatch, navigate);
        };

        checkAuth(); // Run authentication check on component mount
    }, [dispatch, navigate]);

    return (
        <div className="w-screen h-screen text-white flex items-center justify-center bg-neutral-800">
            Logging you in...
        </div>
    );
};

export default SuccessLogin;
