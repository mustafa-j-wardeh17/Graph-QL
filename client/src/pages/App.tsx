import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setAuthUser, setIsAuthenticated } from "../../redux/auth/authSlice";
import { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import { GET_SEARCH_TODOS } from './../../graphql/Query';
import { TodoCard } from "../components/TodoCard";
import { BiLogOut, BiPrinter } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { debounce } from 'lodash';  // For debouncing the search
import Pagination from "../components/Pagination";

export type FormData = {
  id?: number;
  title: string;
  description: string;
  date: string;
  complete: boolean;
};

function App() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');  // For debounced search
  const { loading, error, data, refetch } = useQuery(GET_SEARCH_TODOS, {
    variables: { search: searchTerm, page: page },
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editData, setEditData] = useState<FormData | undefined>();

  const dispatch = useDispatch();

  const { authUser, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    dispatch(setIsAuthenticated(false));
    dispatch(setAuthUser(null));

    const response = await fetch('http://localhost:5000/api/v1/auth/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      console.log('User logged out successfully');
    }
  };

  const handleSearchChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim());  // Trigger the debounced search
  }, 500);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong while fetching todos</p>;
  return (
    <div className="max-w-screen relative overflow-hidden min-h-screen text-white flex flex-col gap-6 bg-neutral-800">
      <div className="flex gap-2 justify-between items-center bg-neutral-900 py-2 px-4 shadow-md shadow-[#303030]">
        <h1 className="md:text-[32px] xs:text-[24px] text-[18px] font-bold font-mono">Todo Operation System</h1>
        <div className="flex justify-between items-center gap-2">
          <img
            src={`${authUser?.picture}`}
            alt="profile picture"
            className="w-[40px] h-[40px] rounded-full 350:block hidden"
          />
          <h1 className="md:block hidden">{authUser?.fullName}</h1>
          <button
            className="bg-neutral-950 hover:bg-neutral-800 flex items-center justify-center py-2 px-2 rounded-lg shadow-lg"
            onClick={handleLogout}
          >
            <BiLogOut />
          </button>
        </div>
      </div>

      <div className="flex w-full lg:px-[120px] md:px-[80px] sm:px-[40px] xs:px-[20px] px-[8px] pt-[20px] pb-[60px] flex-col gap-8">
        <div className="flex justify-between">
          <button
            onClick={() => { setShowForm(true); setEditData(undefined); }}
            className="flex items-center font-bold shadow-md shadow-neutral-600 bg-blue-600 hover:bg-blue-400 px-4 gap-1 py-2 rounded-md"
          >
            <FaPlus className="font-bold" />
            <span>New</span>
          </button>
          <button
            className="flex items-center font-bold shadow-md shadow-neutral-600 bg-green-600 hover:bg-green-400 px-4 gap-1 py-2 rounded-md"
          >
            <BiPrinter className="font-bold" />
            <span>PDF</span>
          </button>
        </div>

        <div className="flex w-full justify-end items-center gap-2">
          <label className="text-neutral-200">Search:</label>
          <input
            type="text"
            value={search}
            onChange={(e) => { setPage(1); setSearch(e.target.value); handleSearchChange(e); }}
            className="p-2 bg-transparent text-neutral-400 focus:ring-0 focus:outline-none border-[1px] border-neutral-600 rounded-lg"
          />
        </div>

        <div className="border-[1px] border-neutral-700" />

        <div className="flex flex-wrap justify-center w-full gap-4 mt-[20px]">
          {data?.getSearchTodos.todos.length === 0 ? (
            <p>No todos found for your search</p>
          ) : (
            (data?.getSearchTodos.todos || []).map((item: FormData, idx: number) => (
              <TodoCard
                key={idx}
                todo={item}
                setShowForm={setShowForm}
                setEditData={setEditData}
                refetch={refetch}
              />
            ))
          )}
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={Math.ceil(data?.getSearchTodos?.totalTodos / 10) || 1}
        />
      </div>

      <TodoForm
        setShowForm={setShowForm}
        showForm={showForm}
        editData={editData}
        setEditData={setEditData}
        refetch={refetch}
      />
    </div>
  );
}

export default App;
