import React, {useCallback, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.module.css';
import {Users} from "./01-Users/Users";
import {useDispatch, useSelector} from "react-redux";
import {filterUsers, getUsersListTC} from "./00-bll/user-reducer";
import {selectorUserList} from "./00-bll/selectors";
import s from './App.module.css';
import {Search} from "./02-Search/Search";


type GeoType = {
    lat: string,
    lng: string
}

type AddressType = {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: GeoType
}
type CompanyType = {
    name: string,
    catchPhrase: string,
    bs: string
}
export type UsersType = {
    id: string,
    name: string,
    username: string,
    email: string,
    address: AddressType,
    phone: string,
    website: string,
    company: CompanyType
}


function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersListTC())
    }, [])

    const usersArr = useSelector(selectorUserList)


    const mappedUsers = useCallback(() => {
        return usersArr && usersArr.map((user, index) => {
            return <Users key={user.id}
                          users={user}
            />
        })
    }, [usersArr])

    return (
        <div className={s.container}>

            <Search />

            <table className={s.tableContainer}>
                <thead className={s.tableHeaders}>
                <tr>
                    <th>Name</th>
                    <th>UserName</th>
                    <th>Email</th>
                    <th></th>
                </tr>
                </thead>
                <tbody className={s.tableBody}>
                {
                    mappedUsers()
                }
                </tbody>
            </table>

        </div>
    );
}

export default App;
