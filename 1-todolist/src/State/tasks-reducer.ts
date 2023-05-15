import {v1} from "uuid";
import {TaskStateType} from "../App";
import {TaskType} from "../Components/ToDoList/ToDoList";
import {AddTodoListAT, RemoveTodoListAT} from "./todolist-reducer";

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}
type AddTaskAT = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}
type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    newIsDone: boolean
    todoListId: string
}
type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    newTitle: string
    todoListId: string
}

export type TaskActionTypes = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: TaskActionTypes): TaskStateType => {

    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
            const newId = v1()
            const newTask: TaskType = {id: newId, title: action.title, isDone: false}

            return {
                ...state, [action.todoListId]: [newTask, ...state[action.todoListId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.todoListId]: state[action.todoListId].map(
                    t => t.id === action.taskId ? {...t, isDone: action.newIsDone} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.todoListId]: state[action.todoListId].map(
                    t => t.id === action.taskId ? {...t, title: action.newTitle} : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.todolistId]: []
            }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default :
            return state
    }
}

export const RemoveTaskAC = (taskId: string, todoListId: string): RemoveTaskAT => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todoListId
    } as const
}
export const AddTaskAC = (title: string, todoListId: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todoListId
    } as const
}
export const ChangeTaskStatusAC = (taskId: string, newIsDone: boolean, todoListId: string): ChangeTaskStatusAT => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        newIsDone,
        todoListId
    } as const
}
export const ChangeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string): ChangeTaskTitleAT => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        newTitle,
        todoListId
    } as const
}