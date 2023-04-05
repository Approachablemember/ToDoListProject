import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";


export type FilterValueType = "all" | "active" | "completed"
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType
}

type TaskStateType = {
    [todoListId: string]: TaskType[]
}


function App(): JSX.Element {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ]);

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "CSS & SCSS", isDone: true},
            {id: v1(), title: "ES6/TS", isDone: false},
            {id: v1(), title: "REDUX", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Salt", isDone: true},
            {id: v1(), title: "Sugar", isDone: false},
            {id: v1(), title: "Milk", isDone: false}
        ]
    })


    const taskRemover = (taskId: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter((task) => task.id !== taskId)})
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {

        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})
    }
    const changeToDoListFilter = (filter: FilterValueType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }

    const removeTodoList = (todoListsId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListsId))
        delete tasks[todoListsId]
    }

    const getFilteredTasksForRender = (taskList: TaskType[], filterValue: FilterValueType) => {
        switch (filterValue) {
            case "all":
                return taskList
            case "active":
                return taskList.filter(t => !t.isDone)
            case "completed":
                return taskList.filter(t => t.isDone)
            default:
                return taskList

        }
    }

    const todoListComponents = todoLists.map(tl => {
        let tasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)

        return (
            <ToDoList
                key={tl.id}

                todoListId={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForRender}

                addTask={addTask}
                taskRemover={taskRemover}
                changeToDoListFilter={changeToDoListFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
            />
        )
    })

    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}

export default App;
