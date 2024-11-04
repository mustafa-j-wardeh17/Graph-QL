import { useEffect } from 'react';

const SuccessLogin = () => {

    useEffect(() => {
        // Optionally close the window after verification
        setTimeout(() => {
            window.close();
        }, 1000);
    }, []);

    return (
        <div className="w-screen h-screen text-white flex items-center justify-center bg-neutral-800">
            Login Success
        </div>
    );
};

export default SuccessLogin;
