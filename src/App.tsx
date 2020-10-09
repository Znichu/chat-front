import React from 'react';
import {JoinBlock} from "./page/Join/JoinBlock";
import {Chat} from "./page/Chat/Chat";
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
