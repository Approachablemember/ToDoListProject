import React, {useEffect, useState} from 'react';
import './App.css';
import {TaskType} from "./Components/ToDoList/ToDoList";
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
    AddTodoListAC
} from "./State/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";
import ToDoListWithRedux from "./Components/ToDoList/ToDoListWithRedux";

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
    const dispatch = useDispatch()
    const addTodoList = (title: string) => {
        dispatch(AddTodoListAC(title))
    }

    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid key={tl.id} item>
                <Paper elevation={8}>
                    <ToDoListWithRedux todoList={tl}/>
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
