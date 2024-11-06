export const TodoCard = ({ todo }: { todo: any }) => (
    <div className="bg-green-500 flex flex-col gap-2 justify-between rounded-lg shadow-md shadow-gray-600 p-4 w-[300px] h-[180px]">
        <h1 className="font-bold text-xl">{todo.title}</h1>
        <p className="text-sm text-gray-200">{todo.description}</p>
        <div className="flex gap-2 justify-end">
            <button className="bg-blue-500 hover:bg-blue-400 rounded-md duration-200 px-3 py-1 text-sm">Edit</button>
            <button className="bg-red-500 hover:bg-red-400 rounded-md duration-200 px-3 py-1 text-sm">Delete</button>
        </div>
    </div>
);