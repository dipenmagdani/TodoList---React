import React, { useContext, useEffect } from 'react';
import { TaskList } from './TaskList';
import { TodoContext } from '../context/TodoContext';
import { Toaster, toast } from 'sonner';

const Header = () => {
    const { todoInput, setTodoInput, todoItem, setTodoItem, isEditItem, setIsEditItem, toggle, setToggle } = useContext(TodoContext);
    const addItem = () => {
        if (!todoInput) {
            toast.error("Please fill the Data");
        } else if (todoInput && isEditItem) {
            setTodoItem(todoItem.map((currElement) => {
                if (currElement.id === isEditItem) {
                    return { ...currElement, name: todoInput }
                }
                return currElement

            }))
            setIsEditItem("")
            setTodoInput("")
            setToggle(false)

        } else {
            const newInputData = {
                id: new Date().getTime().toString(),
                name: todoInput,
            }
            setTodoItem([...todoItem, newInputData]);
            setTodoInput('');  // Clear the input field after adding the item
        }
    };

    const editTodo = (index) => {
        const editItem = todoItem.find((currElement) => {
            return currElement.id === index
        })
        setIsEditItem(index)
        setTodoInput(editItem.name)
        setToggle(true)
    }

    const deleteTodo = (index) => {
        const newTodoItem = todoItem.filter((currElement) => {
            return currElement.id !== index
        })
        setTodoItem(newTodoItem)
    }


    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoItem))
    }, [todoItem])

    useEffect(() => {
        const savedTodoList = localStorage.getItem("todoList");
        if (savedTodoList) {
            setTodoItem(JSON.parse(savedTodoList));
        }
    }, [setTodoItem]);
    return (
        <>
            <div className="h-screen flex justify-center items-center flex-col gap-8">
                <div className="flex justify-center items-center gap-6">
                    <input
                        className="w-72 border-2 text-neutral-800 rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
                        placeholder="Enter a new task"
                        value={todoInput}
                        onChange={(e) => setTodoInput(e.target.value)}
                    />
                    {
                        toggle ? <button
                            className="h-full px-5 py-2 bg-[#0264F6] text-white font-medium rounded-md hover:bg-green-400"
                            onClick={addItem}
                        >
                            Edit Item
                        </button> : <button
                            className="h-full px-5 py-2 bg-[#0264F6] text-white font-medium rounded-md hover:bg-green-400"
                            onClick={addItem}
                        >
                            Add Todo Item
                        </button>
                    }
                    <Toaster position="bottom-center" richColors />
                </div>
                <TaskList deleteTodo={deleteTodo} editTodo={editTodo} />
            </div>
        </>
    );
};

export default Header;
