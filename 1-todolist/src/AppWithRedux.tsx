import React, {useEffect, useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./Components/ToDoList/ToDoList";
import AddItemForm from "./Components/AddItemForm/AddItemForm";
import {
    AppBar,
    Checkbox,
    FormControlLabel,
    FormGroup,
    IconButton,
    Toolbar,
    Typography,
    Button,
    Container, Grid, Paper, ThemeProvider, createTheme, CssBaseline
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {blue, deepPurple} from "@mui/material/colors";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC, ChangeTodoListTitleAC,
    RemoveTodoListAC
} from "./State/todolist-reducer";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC
} from "./State/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";

export type FilterValueType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskStateType = {
    [todoListId: string]: TaskType[]
}

function AppWithRedux(): JSX.Element {

    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    // Tasks functions
    const taskRemover = (taskId: string, todoListId: string) => {
        dispatch(RemoveTaskAC(taskId, todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
        dispatch(AddTaskAC(title, todoListId))
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        dispatch(ChangeTaskStatusAC(taskId, newIsDone, todoListId))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        dispatch(ChangeTaskTitleAC(taskId, newTitle, todoListId))
    }

    // TodoList functions
    const changeToDoListFilter = (filter: FilterValueType, todoListId: string) => {
        dispatch(ChangeTodoListFilterAC(todoListId, filter))
    }
    const removeTodoList = (todoListsId: string) => {
        dispatch(RemoveTodoListAC(todoListsId))
    }
    const addTodoList = (title: string) => {
        dispatch(AddTodoListAC(title))
    }
    const changeToDoListTitle = (newTitle: string, todoListId: string) => {
        dispatch(ChangeTodoListTitleAC(todoListId, newTitle))
    }

    // UI
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
            <Grid key={tl.id} item>
                <Paper elevation={8}>
                    <ToDoList
                        key={tl.id}

                        todoListId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForRender}

                        addTask={addTask}
                        taskRemover={taskRemover}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}

                        changeToDoListFilter={changeToDoListFilter}
                        removeTodoList={removeTodoList}
                        changeToDoListTitle={changeToDoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    const [isDarkMode, setDarkMode] = useState<boolean>(true)
    useEffect(() => {
        const date = new Date()
        const hours = date.getHours()
        hours > 8 && hours < 20 ? setDarkMode(false) : setDarkMode(true)
    }, [])
    const mode = isDarkMode ? 'dark' : 'light'
    const customTheme = createTheme({
        palette: {
            primary: deepPurple,
            secondary: blue,
            mode: mode
        }
    })

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline/>
            <div className="App">
                <AppBar position={'static'}>
                    <Toolbar>
                        <IconButton
                            size={'large'}
                            edge={'start'}
                            color={'inherit'}
                            aria-label={'menu'}
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant={'h6'} component={'div'} sx={{flexGrow: 1}}>
                            TodoLists
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={isDarkMode}
                                                   onChange={(e) => setDarkMode(e.currentTarget.checked)}/>}
                                label={isDarkMode
                                    ? 'Dark mode'
                                    : 'Light mode'}
                            />
                        </FormGroup>
                        <Button color={'inherit'}>Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container sx={{p: '15px 0'}}>
                        <AddItemForm
                            addNewItem={addTodoList}
                        />
                    </Grid>
                    <Grid container spacing={4}>
                        {todoListComponents}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default AppWithRedux;
