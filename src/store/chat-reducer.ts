import { ThunkAction } from "redux-thunk";
import {InferActionTypes, RootState} from "./store";
import {joinAPI} from "../api/join";
import {socketAPI} from "../api/socket";
import {ChatDataType, ChatMessageType} from "../type/types";

let initialState = {
    roomId: '',
    userName: '',
    joined: false,
    isFetching: false,
    users: [] as string[],
    messages: [] as ChatMessageType[]

}

export const ChatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SET_CHAT_DATA": {
            return {
                ...state,
                users: action.data.users,
                messages: action.data.messages
            }
        }
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
        case "SET_NEW_MESSAGE": {
            return {
                ...state,
                messages: [...state.messages, action.message]
            }
        }
        case "SET_JOIN": {
            return {
                ...state,
                roomId: action.roomId,
                userName: action.userName,
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
    setJoin: (joined: boolean, roomId: string, userName: string) => ({type: 'SET_JOIN', joined, roomId, userName} as const),
    setUsers: (users: string[]) => ({type: 'SET_USERS', users} as const),
    setMessages: (messages: ChatMessageType[]) => ({type: 'SET_MESSAGES', messages} as const),
    setNewMessage: (message: ChatMessageType) => ({type: 'SET_NEW_MESSAGE', message} as const),
    setChatData: (data: ChatDataType) => ({type: 'SET_CHAT_DATA', data} as const)
}

//Thunk
export const requestJoin = (roomId: string, userName: string): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.toggleIsFetching(true));
        await joinAPI.join(roomId,userName);
        dispatch(actions.setJoin(true, roomId, userName));
        socketAPI.roomJoin(roomId, userName,
            (data) => {
                dispatch(actions.setChatData(data))
            });
    } catch (e) {
        console.log(e)
    }
    dispatch(actions.toggleIsFetching(false));
}

export const chatSubscribe = (): ThunkType => async (dispatch) => {
    socketAPI.createConnection();
    socketAPI.subscribe((data) => {
        debugger
        dispatch(actions.setUsers(data.users))
    },
        (message) => {
            dispatch(actions.setNewMessage(message))
    });
}

export const requestSendNewMessage = (message: string, roomId: string, userName: string): ThunkType => async (dispatch) => {
    socketAPI.sendMessage(message, roomId, userName)
}

//Types
type InitialStateType = typeof initialState;
type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsTypes>;
type ActionsTypes = InferActionTypes<typeof actions>;