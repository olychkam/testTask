import {UsersType} from "../App";
import {usersAPI} from "../00-api/Api";
import {AppStateType} from "./store";
import {ThunkDispatch} from 'redux-thunk';

export type UsersActionsType = ReturnType<typeof setUsers> |
    ReturnType<typeof deleteUser> | ReturnType<typeof filterUsers>

const initializeState: UsersType[] = []
type InitialStateType = typeof initializeState

export const userReducer = (state: InitialStateType = initializeState, action: UsersActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_USERS': {
            return [...action.users]
        }
        case "DELETE_USER": {
            return state.filter(u => u.id !== action.id)
        }
        case "FILTER_USER": {
            return [...action.value]
        }
        default:
            return state;
    }
}
export const setUsers = (users: UsersType[]) => ({
    type: "SET_USERS", users
} as const)
export const deleteUser = (id: string) => ({
    type: "DELETE_USER", id
} as const)
export const filterUsers = (value: UsersType[]) => ({
    type: "FILTER_USER", value
} as const)

export const getUsersListTC = () => async (dispatch: ThunkDispatch<AppStateType, unknown, UsersActionsType>) => {
    try {
        const res = await usersAPI.fetchUsers()
        dispatch(setUsers(res.data));
    } catch (error) {
        console.log('Error')
    }
}

export const deleteUserTC = (id: string) => async (dispatch: ThunkDispatch<AppStateType, unknown, UsersActionsType>) => {
    try {
        dispatch(deleteUser(id))
    } catch (error) {

    }
}

