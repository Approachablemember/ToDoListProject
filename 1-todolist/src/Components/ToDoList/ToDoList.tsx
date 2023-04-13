import React, {FC} from 'react';
import {FilterValueType} from '../../App';
import AddItemForm from "../AddItemForm/AddItemForm";
import TasksItems from "../TasksItems/TasksItems";
import EditableSpan from "../EditableSpan/EditableSpan";

export type TaskType = {
    id: string
    isDone: boolean
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
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeToDoListTitle: (newTitle: string, todoListId: string) => void
}

const ToDoList: FC<ToDoListPropsType> = (props) => {

    // Classes changing logic
    let isAllTasksNotIsDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }
    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"
    const emptyTodoList = (<div>Your To-Do list is empty</div>)

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const todoListRemoverHandler = () => props.removeTodoList(props.todoListId)

    const newTodoListTitle = (title: string) => {
        props.changeToDoListTitle(title, props.todoListId)
    }

    return (
        <div className={todoClasses}>
            <div>
                <h3><EditableSpan title={props.title} changeTitle={newTodoListTitle} />
                    <button className={'btn-cross'} onClick={todoListRemoverHandler}>x</button>
                </h3>
                <div>
                    <AddItemForm addNewItem={addTaskHandler}/>
                </div>
                {props.tasks.length === 0 ? emptyTodoList : ''}
                <ul>
                    <TasksItems
                        key={props.todoListId}
                        tasks={props.tasks}
                        todoListId={props.todoListId}
                        taskRemover={props.taskRemover}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                    />
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