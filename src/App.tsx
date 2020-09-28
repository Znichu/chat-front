import React from 'react';
import io from 'socket.io-client';
import {JoinBlock} from "./components/JoinBlock/JoinBlock";

const socket = io('http://localhost:8080');

function App() {
    return (
        <>
            <JoinBlock />
        </>
    );
}

export default App;
