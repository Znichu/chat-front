import React, {useEffect} from 'react';
import {JoinBlock} from "./components/JoinBlock/JoinBlock";
import socket from "./socket";
import {Chat} from "./components/Chat/Chat";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "./store/chat-reducer";
import {RootState} from "./store/store";


const App = () => {

    const joined = useSelector((state: RootState) => state.chat.joined);

    return (
        <>
            {!joined ? <JoinBlock /> : <Chat/> }
        </>
    );
}

export default App;
