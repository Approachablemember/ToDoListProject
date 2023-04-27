import React, {useEffect, useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./Components/ToDoList/ToDoList";
import {v1} from "uuid";
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

export type FilterValueType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

type TaskStateType = {
    [todoListId: string]: TaskType[]
}

function App(): JSX.Element {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    // Examples of todolist
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
    const [isDarkMode, setDarkMode] = useState<boolean>(true)

    useEffect( () => {
        const date = new Date()
        const hours = date.getHours()
        hours > 8 && hours < 20? setDarkMode(false) : setDarkMode(true)
    }, [] )

    const taskRemover = (taskId: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter((task) => task.id !== taskId)})
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
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

    const changeToDoListFilter = (filter: FilterValueType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const removeTodoList = (todoListsId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListsId))
        delete tasks[todoListsId]
    }
    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {id: newTodoListId, title, filter: 'all'}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
    }
    const changeToDoListTitle = (newTitle: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl))
    }

    const todoListComponents = todoLists.map(tl => {
        let tasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)

        return (
            <Grid item>
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
                                : 'Dark mode'}
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

export default App;
