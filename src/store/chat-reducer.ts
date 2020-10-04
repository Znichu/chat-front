import {ThunkAction} from "redux-thunk";
import {InferActionTypes, RootState} from "./store";
import {joinAPI} from "../api/join";
import {socketAPI} from "../api/socket";
import {ChatDataType, ChatMessageType, ChatUserType} from "../type/types";
import {Dispatch} from "redux";

let initialState = {
    roomId: '',
    userName: '',
    joined: false,
    isFetching: false,
    users: [] as ChatUserType[],
    messages: [] as ChatMessageType[],
    typingUsers: [] as ChatUserType[]
}

export const ChatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SET_CHAT_DATA": {
            return {
                ...state,
                users: action.data.users,
                messages: [...state.messages, ...action.data.messages]
            }
        }
        case "SET_USERS": {
            return {
                ...state,
                users: action.users
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
        case "TYPING_USER_ADDED": {
            return {
                ...state,
                typingUsers: [...state.typingUsers.filter(user => user.id !== action.user.id), action.user]
            }
        }
        case "TYPING_USER_DELETE": {
            return {
                ...state,
                typingUsers: state.typingUsers.filter(user => user.id !== action.user.id)
            }
        }
        default:
            return state;
    }
}

//Actions
export const actions = {
    toggleIsFetching: (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching} as const),
    setJoin: (joined: boolean, roomId: string, userName: string) => ({
        type: 'SET_JOIN',
        joined,
        roomId,
        userName
    } as const),
    setUsers: (users: ChatUserType[]) => ({type: 'SET_USERS', users} as const),
    setNewMessage: (message: ChatMessageType) => ({type: 'SET_NEW_MESSAGE', message} as const),
    setChatData: (data: ChatDataType) => ({type: 'SET_CHAT_DATA', data} as const),
    typingUserAdded: (user: ChatUserType) => ({type: 'TYPING_USER_ADDED', user} as const),
    typingUserDelete: (user: ChatUserType) => ({type: 'TYPING_USER_DELETE', user} as const)
}

//Thunk
export const requestJoin = (roomId: string, userName: string, urlAvatar: string): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.toggleIsFetching(true));
        await joinAPI.join(roomId, userName);
        dispatch(actions.setJoin(true, roomId, userName));
        socketAPI.roomJoin(roomId, userName, urlAvatar);
        const data = await joinAPI.getRoomData(roomId);
        dispatch(actions.setChatData(data))
    } catch (e) {
        console.log(e)
    }
    dispatch(actions.toggleIsFetching(false));
}

let timerId = 0;

export const chatSubscribe = (): ThunkType => async (dispatch) => {
    socketAPI.createConnection();
    socketAPI.subscribe((users) => {
            dispatch(actions.setUsers(users))
        },
        (message) => {
            dispatch(actions.setNewMessage(message))
        },
        (user: ChatUserType) => {
            dispatch(actions.typingUserAdded(user));
            clearTimeout(timerId);
            timerId = window.setTimeout(() => {
                dispatch(actions.typingUserDelete(user))
            }, 5000)
        })
}

export const requestSendNewMessage = (message: string, roomId: string, userName: string): ThunkType => async (dispatch) => {
    socketAPI.sendMessage(message, roomId, userName)
}

export const requestTypeMessage = (roomId: string): ThunkType => async (dispatch) => {
    socketAPI.typeMessage(roomId)
}

//Types
type InitialStateType = typeof initialState;
type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsTypes>;
type ActionsTypes = InferActionTypes<typeof actions>;