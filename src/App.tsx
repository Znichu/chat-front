import React, {useEffect} from 'react';
import {JoinBlock} from "./components/JoinBlock/JoinBlock";
import socket from "./socket";
import {Chat} from "./components/Chat/Chat";
import {useDispatch} from "react-redux";
import {actions} from "./store/chat-reducer";

/*const socket = io('http://localhost:7542');*/

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('ROOM:JOINED', (users: string[]) => {
            dispatch(actions.setUsers(users))
        })
    }, []);

    return (
        <>
            <JoinBlock />
            <Chat/>
        </>
    );
}

export default App;
