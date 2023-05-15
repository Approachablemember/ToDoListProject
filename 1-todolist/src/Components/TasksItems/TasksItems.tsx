import React, {ChangeEvent} from 'react';
import {TaskType} from "../ToDoList/ToDoList";
import EditableSpan from "../EditableSpan/EditableSpan";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Checkbox, IconButton, List, ListItem} from "@mui/material";

type TodoListItemsType = {
    tasks: TaskType[]
    todoListId: string
    taskRemover: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
}

const TasksItems = (props: TodoListItemsType) => {



    // Tasks mapping into new form
    const toDoListItems: Array<JSX.Element> = props.tasks.map((task: TaskType) => {
        const removeTaskHandler = () => props.taskRemover(task.id, props.todoListId)
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
        const changeTitle = (title: string) => {
            props.changeTaskTitle(task.id, title, props.todoListId)
        }
        return (
            <ListItem
                key={task.id}
                divider
                disablePadding={true}
                secondaryAction={
                    <IconButton
                        size={"small"}
                        onClick={removeTaskHandler}>
                        <HighlightOffIcon/>
                    </IconButton>
                }
            >

                <Checkbox
                    key={task.id}
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}
                    // type="checkbox"
                />
                <EditableSpan
                    key={task.id}
                    title={task.title}
                    spanClasses={task.isDone ? 'task-done' : 'task'}
                    changeTitle={changeTitle}/>

            </ListItem>
        )
    })
    return (
        <List disablePadding={true}>

            {toDoListItems}
        </List>
    );
};

export default TasksItems;