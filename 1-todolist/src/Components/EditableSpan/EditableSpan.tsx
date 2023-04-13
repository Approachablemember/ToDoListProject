import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    spanClasses?: string
    inputClasses?: string
    changeTitle: (title: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = (
    {
        title,
        spanClasses,
        changeTitle
    }) => {
    let [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const changeNewTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && editModeOff()
    }

    const editModeOn = () => {
        setEditMode(true)
    }

    const editModeOff = () => {
        setEditMode(false)
        changeTitle(newTitle)
    }

    return (

        editMode
            ? <input
                value={newTitle}
                onChange={changeNewTitle}
                autoFocus
                onBlur={editModeOff}
                onKeyDown={onEnter}
            />
            : <span className={spanClasses} onDoubleClick={editModeOn}>{title}</span>


    );
};

export default EditableSpan;