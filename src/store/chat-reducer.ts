import { ThunkAction } from "redux-thunk";
import {InferActionTypes, RootState} from "./store";
import {loginAPI} from "../api/chat";

let initialState = {
    isAuth: false,
    isFetching: false
}

export const ChatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SET_AUTH": {
            return {
                ...state,
                isAuth: action.auth
            }
        }
        case "TOGGLE_IS_FETCHING": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state;
    }
}

//Actions
const actions = {
    toggleIsFetching: (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching} as const ),
    setIsAuth: (auth: boolean) => ({type: 'SET_AUTH', auth} as const)
}

//Thunk
export const requestIsAuth = (roomId: string, userName: string): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.toggleIsFetching(true));
        await loginAPI.login(roomId, userName);
        dispatch(actions.setIsAuth(true))
    } catch (e) {
        console.log(e)
    }
    dispatch(actions.toggleIsFetching(false));
}

//Types
type InitialStateType = typeof initialState;
type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsTypes>;
type ActionsTypes = InferActionTypes<typeof actions>;