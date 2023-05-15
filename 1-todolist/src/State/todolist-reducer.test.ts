import {v1} from "uuid";
import {TodoListType} from "../App";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistReducer
} from "./todolist-reducer";

let todoListId1: string
let todoListId2: string
let startState: TodoListType[]

beforeEach( () => {
    todoListId1 = v1()
    todoListId2 = v1()
    startState = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]
} )

test('correct todolist should be removed', () => {
    //

    //
    const endState = todolistReducer(startState, RemoveTodoListAC(todoListId1))
    //
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)

})

test('correct todolist should be added', () => {
    //

    const newTodoListTitle = 'New TodoList'

    //
    const endState = todolistReducer(startState, AddTodoListAC(newTodoListTitle))
    //
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)

})

test('correct todolist should change its title', () => {
    //

    const newTodoListTitle = 'New TodoList'


    //
    const endState = todolistReducer(startState, ChangeTodoListTitleAC(todoListId1, newTodoListTitle))
    //
    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTodoListTitle)

})

test('correct todolist should change its filter value to active', () => {
    //

    //
    const endState = todolistReducer(startState, ChangeTodoListFilterAC(todoListId1, 'active'))
    //
    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe('all')

})