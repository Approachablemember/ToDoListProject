import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";


export type FilterValueType = "all" | "active" | "completed"

function App(): JSX.Element {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "CSS & SCSS", isDone: true},
        {id: v1(), title: "ES6/TS", isDone: false},
        {id: v1(), title: "REDUX", isDone: false}
    ])
    const taskRemover = (taskId: string) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        setTasks([...tasks, newTask])
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t))
    }


    const [filter, setFilter] = useState<FilterValueType>("all")

    const changeToDoListFilter = (filter: FilterValueType) => {
        setFilter(filter)
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
    let tasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks, filter)

    return (
        <div className="App">
            <ToDoList
                addTask={addTask}
                taskRemover={taskRemover}
                title={"What to Learn"}
                filter={filter}
                tasks={tasksForRender}
                changeToDoListFilter={changeToDoListFilter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
