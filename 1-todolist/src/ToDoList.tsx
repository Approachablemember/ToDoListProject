import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterValueType} from './App';
// rsc react stateless component
export type TaskType = {
    id: string,
    isDone: boolean,
    title: string
}

type  ToDoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    taskRemover: (taskId: string, todoListId: string) => void
    changeToDoListFilter: (filter: FilterValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoListId: string) => void
    removeTodoList: (todoListsId: string) => void
}


const ToDoList: FC<ToDoListPropsType> = (props) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    // Classes changing logic
    let isAllTasksNotIsDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }
    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"

    // Tasks mapping into new form
    const toDoListItems: Array<JSX.Element> = props.tasks.map((task: TaskType) => {
        const removeTaskHandler = () => props.taskRemover(task.id, props.todoListId)
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
        return (
            <li>
                <input
                    onChange={changeTaskStatusHandler}
                    type="checkbox"
                />
                <span className={task.isDone ? 'task-done' : 'task'}>{task.title + ' '}</span>
                <button className={'btn-cross'} onClick={removeTaskHandler}>x
                </button>
            </li>
        )
    })
    // Title input validating const's
    const maxTitleLength = 20
    const recommendedTitleLength = 10
    const isAddTaskNotPossible = !title.length || title.length >= maxTitleLength

    // Handlers/callbacks
    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListId)
            setTitle("")
        } else {
            setError(true)
        }
        setTitle("")

    }
    const setLocalTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(event.currentTarget.value)
    }
    const todoListRemoverHandler = () => props.removeTodoList(props.todoListId)
    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined
        : (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && addTaskHandler()
    const longTitleWarningMessage = (<div style={{color: "white"}}>Title should be shorter</div>)
    const longTitleErrorMessage = (<div style={{color: "red"}}>Title too long</div>)
    const errorMessage = error && (<div style={{color: 'red'}}>Please write proper task title</div>)

    return (
        <div className={todoClasses}>
            <div>
                <h3>{props.title + " "}
                    <button className={'btn-cross'} onClick={todoListRemoverHandler}>x</button>
                </h3>

                <div>
                    <input
                        placeholder={"Enter task title here"}
                        value={title}
                        onChange={setLocalTitleHandler}
                        onKeyDown={onKeyDownAddTaskHandler}
                        className={error ? 'input-error' : 'input'}
                    />
                    <button
                        disabled={isAddTaskNotPossible}
                        onClick={addTaskHandler}
                    >+
                    </button>
                    {errorMessage}
                    {title.length > recommendedTitleLength && title.length <= maxTitleLength && longTitleWarningMessage}
                    {title.length > maxTitleLength && longTitleErrorMessage}
                </div>
                <ul>
                    {toDoListItems}
                </ul>
                <div>
                    <button
                        className={props.filter === 'all' ? 'btn-active' : 'btn-inactive'}
                        onClick={() => {
                            props.changeToDoListFilter("all", props.todoListId)
                        }}
                    >All
                    </button>
                    <button
                        className={props.filter === 'active' ? 'btn-active' : 'btn-inactive'}
                        onClick={() => {
                            props.changeToDoListFilter("active", props.todoListId)
                        }}
                    >Active
                    </button>
                    <button
                        className={props.filter === 'completed' ? 'btn-active' : 'btn-inactive'}
                        onClick={() => {
                            props.changeToDoListFilter("completed", props.todoListId)
                        }}
                    >Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;