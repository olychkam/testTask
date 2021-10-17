import React, {useCallback, useState} from 'react';
import Button from "../03-Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {filterUsers, getUsersListTC, setUsers} from "../00-bll/user-reducer";
import {Input} from "../05-Input/Input";
import s from './Search.module.css';
import {selectorUserList} from "../00-bll/selectors";

type SearchPropsType = {

}

export const Search = (props: SearchPropsType) => {
    const [value, setValue] = useState<string>('')
    const dispatch = useDispatch()
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const usersArr = useSelector(selectorUserList)

    const findUsers = (text: string) => {
        debugger
        console.log(text)
        if(!value){
            return usersArr
        }
        const us = usersArr.filter(el => {
                return (el['name'].includes(value.toLowerCase())
                || el['username'].includes(value.toLowerCase())
                || el['email'].includes(value.toLowerCase()))
            }
        )
        dispatch(filterUsers(us))
        setValue('')
    }
    const showAll = useCallback(() => {
        dispatch(getUsersListTC())
    }, [dispatch])

    return (
        <div>
            <Input className={s.search_input}
                   value={value}
                   placeholder='Search...'
                   onChange={inputHandler}
            />
            <Button onClick={() => {
                findUsers(value)
            }}>FILTER</Button>
            <Button onClick={showAll}>RESET</Button>
        </div>
    )
}