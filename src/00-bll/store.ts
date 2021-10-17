import {combineReducers,applyMiddleware, createStore} from 'redux';
import {userReducer} from "./user-reducer";
import thunkMiddleware from 'redux-thunk'


const rootReducer = combineReducers({
    users: userReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store;
