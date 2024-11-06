import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_TODO } from '../../graphql/Mutation';
import { GET_TODOS } from '../../graphql/Query';

const TodoForm = () => {
    const [addTodo, { data, error, loading }] = useMutation(ADD_TODO, {
        onError: (error) => console.error("Delete error:", error),
        refetchQueries: [{ query: GET_TODOS }], //to refresh data in home page without refresh page
    })
    type FormData = {
        title: string;
        description: string;
        date: string;
        complete: boolean;
    };

    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        complete: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Call addTodo mutation with form data
            await addTodo({
                variables: {
                    title: formData.title,
                    description: formData.description,
                    date: formData.date,
                    complete: formData.complete,
                },
            });

            // Reset form data after successful submission
            setFormData({
                title: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
                complete: false,
            });
        } catch (err) {
            console.error("Error adding todo:", err);
        }
    };
    return (
        <form
            className="flex flex-col gap-3 w-full max-w-[500px]"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col w-full gap-2">
                <label className="font-bold text-lg">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="px-2 py-2 rounded-md bg-transparent border-[1px] border-gray-500 focus:outline-0 text-white"
                />
            </div>

            <div className="flex flex-col w-full gap-2">
                <label className="font-bold text-lg">Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="px-2 py-2 rounded-md bg-transparent border-[1px] border-gray-500 focus:ring-0 focus:outline-0 text-white"
                />
            </div>

            <div className="flex flex-col w-full gap-2">
                <label className="font-bold text-lg">Date</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="px-2 py-2 rounded-md bg-transparent border-[1px] border-gray-500 focus:ring-0 focus:outline-0 text-white"
                />
            </div>

            <button
                className="bg-blue-600 w-[120px] p-2 rounded-md transition-all duration-200 hover:bg-blue-400"
                type="submit"
                disabled={loading}
            >
                {loading ? 'Submitting...' : 'Submit'}
            </button>
            {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
            {data && <p className="text-green-500 mt-2">Todo added successfully!</p>}
        </form>
    );
};

export default TodoForm;
