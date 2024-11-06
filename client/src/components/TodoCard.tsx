import { useMutation } from "@apollo/client";
import { DELETE_TODO } from './../../graphql/Mutation'
import { GET_TODOS } from "../../graphql/Query";

export const TodoCard = ({ todo }: { todo: any }) => {
    const [deleteTodo] = useMutation(DELETE_TODO, {
        refetchQueries: [{ query: GET_TODOS }],
        onError: (error) => console.error("Delete error:", error),
    })
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
        <div className="bg-green-500 flex flex-col gap-2 justify-between rounded-lg shadow-md shadow-gray-600 p-4 w-[300px] h-[180px]">
            <h1 className="font-bold text-xl">{todo.title}</h1>
            <p className="text-sm text-gray-200">{todo.description}</p>
            <div className="flex gap-2 justify-end">
                <button
                    className="bg-blue-500 hover:bg-blue-400 rounded-md duration-200 px-3 py-1 text-sm"
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 hover:bg-red-400 rounded-md duration-200 px-3 py-1 text-sm"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}