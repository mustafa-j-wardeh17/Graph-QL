import { ApolloQueryResult, OperationVariables, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ADD_TODO, UPDATE_TODO } from '../../graphql/Mutation';
import { CgClose } from 'react-icons/cg';
import { FormData } from '../pages/App';

const TodoForm = ({ showForm, setShowForm, editData, setEditData,refetch }: {
    showForm: boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    editData: FormData | undefined;
    setEditData: React.Dispatch<React.SetStateAction<FormData | undefined>>
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}) => {

    const [addTodo] = useMutation(ADD_TODO, {
        onError: (error) => console.error("Error:", error),
        onCompleted: () => {
            refetch(); // Manually refetch the query after mutation
        },    });
    const [updateTodo] = useMutation(UPDATE_TODO, {
        onError: (error) => console.error("Error:", error),
        onCompleted: () => {
            refetch(); 
        },
    });

    const [formData, setFormData] = useState<FormData>({
        id: editData?.id || undefined,
        title: editData?.title || '',
        description: editData?.description || '',
        date: editData?.date || new Date().toISOString().split('T')[0],
        complete: editData?.complete || false,
    });

    useEffect(() => {
        if (editData && editData.id) {
            setFormData({
                id: editData.id,
                title: editData.title,
                description: editData.description,
                date: editData.date,
                complete: editData.complete,
            });
        } else {
            setFormData({
                title: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
                complete: false,
            });
        }
    }, [editData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        if (name === 'date') {
            value = new Date(value).toISOString().split('T')[0]
        }
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editData) {
                await updateTodo({
                    variables: {
                        id: formData.id as number,
                        title: formData.title,
                        description: formData.description,
                        date: formData.date,
                        complete: formData.complete,
                    },
                });
            } else {
                await addTodo({
                    variables: {
                        title: formData.title,
                        description: formData.description,
                        date: formData.date,
                        complete: formData.complete,
                    },
                });
            }


            setFormData({
                title: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
                complete: false,
            });
            setShowForm(false); // Close form after submitting
        } catch (err) {
            console.error("Error adding todo:", err);
        }
    };

    return (
        <div className={`fixed z-[10] ${showForm ? 'flex' : 'hidden'} items-center justify-center bg-black/40 w-full h-full`}>
            <form
                className="flex flex-col gap-3 w-full relative p-8 rounded-2xl max-w-[500px] bg-neutral-600"
                onSubmit={handleSubmit}
            >
                <button
                    type="button"
                    className="absolute right-4 top-4"
                    onClick={() => { setShowForm(false); setEditData(undefined) }}
                >
                    <CgClose />
                </button>
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
                        value={new Date(formData.date).toISOString().split('T')[0]}
                        onChange={handleChange}
                        className="px-2 py-2 rounded-md bg-transparent border-[1px] border-gray-500 focus:ring-0 focus:outline-0 text-white"
                    />
                </div>

                <button
                    className="bg-blue-600 w-[120px] p-2 rounded-md transition-all duration-200 hover:bg-blue-400"
                    type="submit"
                // disabled={loading}
                >
                    Submit
                    {/* {loading ? 'Submitting...' : 'Submit'} */}
                </button>
                {/* {error && <p className="text-red-500 mt-2">Error: {error.message}</p>} */}
                {/* {data && <p className="text-green-500 mt-2">Todo added successfully!</p>} */}
            </form>
        </div>
    );
};

export default TodoForm;