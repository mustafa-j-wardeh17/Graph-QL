import GoogleButton from "react-google-button"

const Login = () => {
    const redirectGoogleSSO = () => {
        const googleLoginUrl = 'http://localhost:5000/api/v1/auth/google/login'
        const newWindow = window.open(googleLoginUrl, "__blank", "width=500,height=600")

        let timer: any = null;
        if (newWindow) {
            timer = setInterval(() => {
                if (newWindow.closed) {
                    console.log('Authenticated Successfully')
                    if (timer) clearInterval(timer)
                }
            }, 500)
        }
    }
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-neutral-800">
            <GoogleButton
                onClick={redirectGoogleSSO}
            />
        </div>
    )
}

export default Login