import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type todoListPropsType = {
    addTodoList: (title: string) => void
}
const TodoListAdder = (props: todoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const addTodoListHandler = () => {
        props.addTodoList(title)
        setTitle('')
    }
    const inputIsEmpty = title.length === 0

    const setLocalTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(event.currentTarget.value)
    }

    const onEnter = inputIsEmpty ? undefined :
        (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && addTodoListHandler()


    return (
        <div>
            <input
                placeholder={'Enter Todo list title here'}
                value={title}
                onChange={setLocalTitleHandler}
                onKeyDown={onEnter}
            />
            <button
                onClick={addTodoListHandler}
                disabled={inputIsEmpty}
            >+
            </button>
        </div>
    );
};

export default TodoListAdder;