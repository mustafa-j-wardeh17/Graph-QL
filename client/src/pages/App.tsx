import { gql, useQuery } from "@apollo/client"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store";
import { setAuthUser, setIsAuthenticated } from "../../redux/auth/authSlice";
import { useEffect } from "react";
import TodoForm from "../components/TodoForm";
import { GET_TODOS } from './../../graphql/Query'
import { TodoCard } from "../components/TodoCard";
export const GET_BOOKS = gql`
  query getBooks {
    books {
      author
    }
  }
`
function App() {

  const { loading, error, data } = useQuery(GET_TODOS)
  console.log(data)

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
          (data?.getTodos || []).map((item: any, idx: number) => (
            <TodoCard key={idx} todo={item} />
          ))
        }

      </div>

    </div>
  )
}

export default App
