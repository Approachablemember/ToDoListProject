import {v1} from "uuid";
import {FilterValueType, TodoListType} from "../App";

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodoList = {
    type: 'ADD-TODOLIST'
    title: string
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

export type ActionType = RemoveTodoListAT | AddTodoList | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todolistReducer = (todolists: TodoListType[], action: ActionType): TodoListType[] => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoListId = v1()
            const newTodoList: TodoListType = {
                id: newTodoListId,
                title: action.title,
                filter: 'all'
            }
            return [...todolists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default :
            return todolists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => {
    return {
        type: 'REMOVE-TODOLIST',
        id: id
    }
}

export const AddTodoListAC = (title: string): AddTodoList => {
    return {
        type: 'ADD-TODOLIST',
        title: title
    }
}

export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleAT => {
  return {
      type: 'CHANGE-TODOLIST-TITLE',
      id: id,
      title: title
  }
}

export const ChangeTodoListFilterAC = (id: string, filter: FilterValueType): ChangeTodoListFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    }

}