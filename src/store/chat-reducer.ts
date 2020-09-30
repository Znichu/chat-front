import { ThunkAction } from "redux-thunk";
import {InferActionTypes, RootState} from "./store";
import {joinAPI} from "../api/join";
import {socketAPI} from "../api/socket";

let initialState = {
    joined: false,
    isFetching: false,
    users: [] as string[],
    messages: [] as string[]

}

export const ChatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SET_USERS": {
            return {
                ...state,
                users: action.users
            }
        }
        case "SET_MESSAGES": {
            return  {
                ...state,
                messages: action.messages
            }
        }
        case "SET_JOIN": {
            return {
                ...state,
                joined: action.joined
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
export const actions = {
    toggleIsFetching: (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching} as const ),
    setJoin: (joined: boolean) => ({type: 'SET_JOIN', joined} as const),
    setUsers: (users: string[]) => ({type: 'SET_USERS', users} as const),
    setMessages: (messages: string[]) => ({type: 'SET_MESSAGES', messages} as const)
}

//Thunk
export const requestJoin = (roomId: string, userName: string): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.toggleIsFetching(true));
        socketAPI.roomJoin(roomId, userName);

    } catch (e) {
        console.log(e)
    }
    dispatch(actions.toggleIsFetching(false));
}

//Types
type InitialStateType = typeof initialState;
type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsTypes>;
type ActionsTypes = InferActionTypes<typeof actions>;