import {TaskStateType} from "../App";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";
import {AddTodoListAC} from "./todolist-reducer";


let startState: TaskStateType

beforeEach( () => {
     startState = {
        "todoListId_1": [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "CSS & SCSS", isDone: true},
            {id: '3', title: "ES6/TS", isDone: false},
            {id: '4', title: "REDUX", isDone: false}
        ],
        "todoListId_2": [
            {id: '1', title: "Water", isDone: true},
            {id: '2', title: "Salt", isDone: true},
            {id: '3', title: "Sugar", isDone: false},
            {id: '4', title: "Milk", isDone: false}
        ]
    }
} )

test('Correct task should be removed from correct array', () => {

    const action = RemoveTaskAC('2', 'todoListId_2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todoListId_1": [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "CSS & SCSS", isDone: true},
            {id: '3', title: "ES6/TS", isDone: false},
            {id: '4', title: "REDUX", isDone: false}
        ],
        "todoListId_2": [
            {id: '1', title: "Water", isDone: true},
            {id: '3', title: "Sugar", isDone: false},
            {id: '4', title: "Milk", isDone: false}
        ]
    })
})

test('Task should be added to correct array', () => {


    const action = AddTaskAC('juice', 'todolistId_2')

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId_1"].length).toBe(4)
    expect(endState["todolistId_2"].length).toBe(5)
    expect(endState["todolistId_2"][0].id).toBeDefined()
    expect(endState["todolistId_2"][0].title).toBe('juice')
    expect(endState["todolistId_2"][0].isDone).toBe(false)
})

test('In correct task of correct array task status should be changed', () => {


    const action = ChangeTaskStatusAC('2', false, 'todolistId_2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId_2'][1].isDone).toBe(false)

})

test('In correct task of correct array task title should be changed', () => {

    const action = ChangeTaskTitleAC('2', 'new title', 'todolistId_2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId_2'][1].title).toBe('new title')

})

test('New array should be added when new Todolist creates', () => {


    const action = AddTodoListAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId_1' && k !== 'todolistId_2')
    if (!newKey){
        throw new Error('new key should be added')
    }
        expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})