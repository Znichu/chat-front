import { ThunkAction } from "redux-thunk";
import {InferActionTypes, RootState} from "./store";
import {joinAPI} from "../api/chat";

let initialState = {
    joined: false,
    isFetching: false
}

export const ChatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
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
const actions = {
    toggleIsFetching: (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching} as const ),
    setJoin: (joined: boolean) => ({type: 'SET_JOIN', joined} as const)
}

//Thunk
export const requestJoin = (roomId: string, userName: string): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.toggleIsFetching(true));
        await joinAPI.join(roomId, userName);
        dispatch(actions.setJoin(true))
    } catch (e) {
        console.log(e)
    }
    dispatch(actions.toggleIsFetching(false));
}

//Types
type InitialStateType = typeof initialState;
type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsTypes>;
type ActionsTypes = InferActionTypes<typeof actions>;