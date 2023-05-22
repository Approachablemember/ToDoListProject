import React from 'react';
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, IconButton, Typography} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {FilterValueType, TodoListType} from "../../AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../State/store";
import TasksItemsWithRedux from "../TasksItems/TasksItemsWithRedux";
import {AddTaskAC} from "../../State/tasks-reducer";
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "../../State/todolist-reducer";

export type TaskType = {
    id: string
    isDone: boolean
    title: string
}
type  ToDoListPropsType = {
    todoList: TodoListType
}

const ToDoListWithRedux = ({todoList}: ToDoListPropsType) => {
    const {id, filter, title} = todoList

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])
    const dispatch = useDispatch()

    const getFilteredTasksForRender = ( filter: FilterValueType) => {
        switch (filter) {
            case "all":
                return tasks
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks

        }
    }


    // Classes changing logic
    let isAllTasksNotIsDone = true
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }
    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"
    const emptyTodoList = (<div>Your To-Do list is empty</div>)

    const addTaskHandler = (title: string) => {
        dispatch(AddTaskAC(title, id))
    }
    const todoListRemoverHandler = () => {
        dispatch(RemoveTodoListAC(id))
    }

    const newTodoListTitle = (title: string) => {
        dispatch(ChangeTodoListTitleAC(id, title))
    }

    return (
        <div className={todoClasses}>
            <div>
                <Typography variant={"h5"} align={"center"} fontWeight={"bold"}>
                    <EditableSpan title={title} changeTitle={newTodoListTitle} />
                    <IconButton
                        size={"small"}
                        onClick={todoListRemoverHandler}>
                        <HighlightOffIcon/>
                    </IconButton>
                </Typography>
                <div>
                    <AddItemForm addNewItem={addTaskHandler}/>
                </div>
                {tasks.length === 0 ? emptyTodoList : ''}
                <ul>
                    <TasksItemsWithRedux
                        key={id}
                        tasks={getFilteredTasksForRender(filter)}
                        todoListId={id}
                        // taskRemover={props.taskRemover}
                        // changeTaskStatus={props.changeTaskStatus}
                        // changeTaskTitle={props.changeTaskTitle}
                    />
                </ul>
                <div className={'btn-filter-container'}>
                    <Button
                        size={"small"}
                        variant={filter === 'all' ? "contained" : "outlined"}
                        className={filter === 'all' ? 'btn-active' : 'btn-inactive'}
                        onClick={() => {
                            dispatch(ChangeTodoListFilterAC(id,"all"))
                        }}
                    >All
                    </Button>
                    <Button
                        size={"small"}
                        variant={filter === 'active' ? "contained" : "outlined"}
                        className={filter === 'active' ? 'btn-active' : 'btn-inactive'}
                        onClick={() => {
                            dispatch(ChangeTodoListFilterAC(id,"active"))
                        }}
                    >Active
                    </Button>
                    <Button
                        size={"small"}
                        variant={filter === 'completed' ? "contained" : "outlined"}
                        className={filter === 'completed' ? 'btn-active' : 'btn-inactive'}
                        onClick={() => {
                            dispatch(ChangeTodoListFilterAC(id,"completed"))
                        }}
                    >Completed
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ToDoListWithRedux;