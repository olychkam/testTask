import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {UsersType} from "../App";
import s from './Users.module.css';
import Button from "../03-Button/Button";
import {deleteUserTC} from "../00-bll/user-reducer";
import Modal from "../04-Modal/Modal/Modal";

type PropsType = {
    users: UsersType
}
export const Users = (props: PropsType) => {
    const [isShown, setIsShown] = useState(false)

    const dispatch = useDispatch()

    const deleteUser = useCallback(() => {
        dispatch(deleteUserTC(props.users.id))
    }, [props.users.id])

    const closeModalWindow = () => {
        setIsShown(false)
    }

    return (
        <>
            <tr className={s.packItem} onClick={() => {
                setIsShown(true)
            }}>
                <td>{props.users.name}</td>
                <td>{props.users.username}</td>
                <td>{props.users.email}</td>
                <td>
                    <button onClick={deleteUser}>X</button>
                </td>

            </tr>
            < Modal closeModalWindow={closeModalWindow}
                    isShown={isShown}
                    showBackground={true}
                    width={600}
                    height={400}
                    top={50}
                    left={50}
                    position={"absolute"}
            >
                <div className={s.modalContainer}>
                    <div className={s.address}>
                        <div><b>Address:</b>{props.users.address.city},{props.users.address.street},
                            {props.users.address.suite};
                        </div>
                        <div>{props.users.address.geo.lat},{props.users.address.geo.lng};</div>
                    </div>
                    <div>
                        <b>Company:</b>{props.users.company.name}
                        <div>{props.users.company.bs}</div>
                        <div>{props.users.company.catchPhrase}</div>
                    </div>
                </div>
            </Modal>
        </>
    )
}