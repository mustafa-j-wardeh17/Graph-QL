import { gql } from "@apollo/client"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store";
import { setAuthUser, setIsAuthenticated } from "../../redux/auth/authSlice";
import { useEffect } from "react";
import TodoForm from "../components/TodoForm";

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
      <TodoForm />
      <div className="flex flex-wrap justify-center max-w-[700px] w-full gap-4 mt-[20px]">
        {
          [1,2,3,4].map((item,idx)=>(
            <div className="bg-green-500 flex flex-col gap-2 justify-between rounded-lg shadow-md shadow-gray-600 p-4 w-[300px] h-[180px]">
              <h1 className="font-bold">Lorem ipsum dolor sit amet.</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, repellendus!</p>
              <div className="w-full flex gap-2 justify-end">
                <button className="bg-blue-500 hover:bg-blue-400 rounded-md duration-200 p-1">edit</button>
                <button className="bg-red-500 hover:bg-red-400 rounded-md duration-200 p-1">delete</button>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default App
