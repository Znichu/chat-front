import React, {useEffect} from 'react';
import {JoinBlock} from "./components/JoinBlock/JoinBlock";
import socket from "./socket";
import {Chat} from "./components/Chat/Chat";

/*const socket = io('http://localhost:7542');*/

function App() {

    useEffect(() => {
        socket.on('ROOM:JOINED', (users: any) => {
            console.log('пользователь вошел', users)
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
