import { legacy_createStore, combineReducers, applyMiddleware  } from "redux";
import taskReducer from "./task-reducer";
import thunkMiddleware from "redux-thunk";
import userReducer from "./user-reducer";

let reducers = combineReducers({
    task: taskReducer,
    user: userReducer
})

let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));

export type RootState = ReturnType<typeof store.getState>

export { store };