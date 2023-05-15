import {v1} from "uuid";
import {FilterValueType, TodoListType} from "../App";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}

export type TodoListActionTypes = RemoveTodoListAT |
    AddTodoListAT |
    ChangeTodoListTitleAT |
    ChangeTodoListFilterAT

const initialState: TodoListType[] = []

export const todolistReducer = (state = initialState, action: TodoListActionTypes): TodoListType[] => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default :
            return state
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    }
}
export const AddTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistId: v1()
    }
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    }
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValueType): ChangeTodoListFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter
    }

}