import { list } from "postcss";
import { createContext, useContext, useState } from "react";
import React from 'react'

export const TodoContext = createContext(null)

export const TodoProvider = (props) => {
    const [todoInput, setTodoInput] = useState("")
    const [todoItem, setTodoItem] = useState(() => {
        const lists = localStorage.getItem("todoList")
        if (lists) {
            return JSON.parse(lists)
        }
        else {
            return []
        }
    })
    const [isEditItem, setIsEditItem] = useState("")
    const [toggle, setToggle] = useState(false)

    return (
        <TodoContext.Provider value={{ todoInput, setTodoInput, todoItem, setTodoItem, isEditItem, setIsEditItem, toggle, setToggle }}>
            {props.children}
        </TodoContext.Provider>
    )
}
