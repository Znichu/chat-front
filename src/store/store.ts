import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {ChatReducer} from "./chat-reducer";


const rootReducer = combineReducers({
    chat: ChatReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U; } ? U : never;

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));