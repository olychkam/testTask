import axios from 'axios'
import {UsersType} from "../App";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
    }
})


export const usersAPI = {
    fetchUsers() {
        return instance.get<UsersType[]>(`users`)
            .then(res => res)
    }
}
