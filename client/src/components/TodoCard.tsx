import { useMutation } from "@apollo/client";
import { DELETE_TODO } from './../../graphql/Mutation'
import { GET_TODOS } from "../../graphql/Query";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FormData } from "../pages/App";

export const TodoCard = ({ todo, setShowForm, setEditData }: {
    todo: FormData;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    setEditData: React.Dispatch<React.SetStateAction<FormData | undefined>>,
}) => {
    const [deleteTodo] = useMutation(DELETE_TODO, {
        refetchQueries: [{ query: GET_TODOS }],
        onError: (error) => console.error("Delete error:", error),
    })
    const handleUpdate = () => {
        setEditData(todo)
        setShowForm(true)
        console.log(todo)
    };
    const handleDelete = async () => {
        try {
            await deleteTodo({
                variables: { id: todo.id },
            });
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };
    return (
        <div className="bg-neutral-900 flex flex-col  justify-between rounded-lg shadow-md shadow-neutral-[#262626] p-4 xl:w-[260px] md:w-[240px] sm:w-[200px] w-[180px] gap-4">
            <h1 className="font-bold text-xl">{todo.title}</h1>
            <p className="text-sm text-gray-200">{todo.description}</p>
            <div className="flex gap-2 justify-end">
                <button
                    onClick={handleUpdate}
                    className="bg-blue-800 hover:bg-blue-900 rounded-md duration-200 px-3 py-1 text-sm"
                >
                    <FaEdit />
                </button>
                <button
                    className="bg-red-800 hover:bg-red-900 rounded-md duration-200 px-3 py-1 text-sm"
                    onClick={handleDelete}
                >
                    <MdDelete />
                </button>
            </div>
        </div>
    );
}