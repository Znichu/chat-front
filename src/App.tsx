import React, {useEffect} from 'react';
import {JoinBlock} from "./components/JoinBlock/JoinBlock";
import socket from "./socket";
import {Chat} from "./components/Chat/Chat";
import {useDispatch} from "react-redux";
import {actions} from "./store/chat-reducer";


function App() {
    const dispatch = useDispatch();

/*    const setUsers = (users: string[]) =>  dispatch(actions.setUsers(users));

    useEffect(() => {
        socket.on('joinRoom', setUsers);
    }, []);*/

    return (
        <>
            <JoinBlock />
            <Chat/>
        </>
    );
}

export default App;
