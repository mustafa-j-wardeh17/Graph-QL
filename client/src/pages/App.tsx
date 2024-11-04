import { gql } from "@apollo/client"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store";
import { setAuthUser, setIsAuthenticated } from "../../redux/auth/authSlice";
import { useEffect } from "react";

export const GET_BOOKS = gql`
  query getBooks {
    books {
      author
    }
  }
`
function App() {
  const dispatch = useDispatch()
  const { authUser, isAuthenticated } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login'
    }
  }, [isAuthenticated])
  const handleLogout = async () => {
    dispatch(setIsAuthenticated(false))
    dispatch(setAuthUser(null))
    const response = await fetch('http://localhost:5000/api/v1/auth/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Include cookies in the request
    });

    // Handle response and update authentication state
    if (response.ok) {
      console.log('user logout successfully')
    }
  }

  return (
    <div className="w-screen h-screen text-white flex flex-col  items-center justify-center bg-neutral-800">
      <img
        src={`${authUser?.picture}`}
        alt="profile picture"
        className="w-[80px] h-[80px] rounded-full mb-5"
      />
      <h1>Welcome: {authUser?.fullName}</h1>
      <h1>Authentication State: {isAuthenticated && 'true'}</h1>
      <button
        className="bg-black/80 hover:bg-black w-[220px] py-2 px-4 mt-5 rounded-lg shadow-lg"
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  )
}

export default App
