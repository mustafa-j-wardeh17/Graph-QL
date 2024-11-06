import React from 'react'

const TodoForm = () => {
    return (
        <form
            className='flex flex-col gap-3 w-full max-w-[500px]'
        >

            <div className='flex flex-col w-full gap-2'>
                <label className='font-bold text-lg'>
                    Title
                </label>
                <input
                    type="text"
                    className='px-2 py-2 rounded-md bg-transparent border-[1px] border-gray-500 focus:outline-0 text-white'
                />
            </div>
            <div className='flex flex-col w-full gap-2'>
                <label className='font-bold text-lg'>
                    Description
                </label>
                <input
                    type="text"
                    className='px-2 py-2 rounded-md bg-transparent border-[1px] border-gray-500 focus:ring-0 focus:outline-0 text-white'
                />
            </div>
            <div className='flex flex-col w-full gap-2'>
                <label className='font-bold text-lg'>
                    Date
                </label>
                <input
                    type="date"
                    className='px-2 py-2 rounded-md bg-transparent border-[1px] border-gray-500 focus:ring-0 focus:outline-0 text-white'
                />
            </div>
            <button
                className='bg-blue-600 w-[120px] p-2 rounded-md transition-all duration-200 hover:bg-blue-400'
                type='submit'
            >
                Submit
            </button>
        </form>
    )
}

export default TodoForm