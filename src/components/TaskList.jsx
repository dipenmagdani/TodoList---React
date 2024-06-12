import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

export const TaskList = ({ deleteTodo, editTodo }) => {
    const { todoItem, setTodoItem } = useContext(TodoContext);

    return (
        <>
            <div className="w-full text-center flex items-center flex-col gap-5">
                <h1 className="text-zinc-300 uppercase font-semibold text-4xl">Task List</h1>
                <div className="w-1/2 h-96 overflow-auto bg-transparent backdrop-blur-lg px-3 py-5 rounded-md mx-auto">
                    {
                        todoItem.map((item, index) => {
                            return (
                                <div className="w-full bg-gray-500 px-3 py-3 rounded-md mb-3" key={index}>
                                    <div className="flex justify-between items-center">
                                        <li className="list-none w-2/3 text-left break-normal text-2xl">{index} {item.name}</li>
                                        <div className="flex gap-3">
                                            <button className="bg-blue-600 text-white px-2 py-2 font-medium rounded-md hover:bg-yellow-400" onClick={() => { editTodo(item.id) }}>Edit</button>
                                            <button className="bg-white text-blue-600 px-2 py-2 font-medium rounded-md" onClick={() => deleteTodo(item.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
};
