import React from 'react';
import {JoinBlock} from "./components/JoinBlock/JoinBlock";
import {Chat} from "./components/Chat/Chat";
import {useSelector} from "react-redux";
import {RootState} from "./store/store";


const App = React.memo(() => {

    const joined = useSelector((state: RootState) => state.chat.joined);

    return (
        <>
            {!joined ? <JoinBlock/> : <Chat/>}
        </>
    );
})

export default App;
