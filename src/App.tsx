import React from 'react';
import {JoinPage} from "./page/JoinPage/JoinPage";
import {ChatPage} from "./page/ChatPage/ChatPage";
import {useSelector} from "react-redux";
import {RootState} from "./store/store";


const App = React.memo(() => {

    const joined = useSelector((state: RootState) => state.chat.joined);

    return (
        <>
            {!joined ? <JoinPage/> : <ChatPage/>}
        </>
    );
})

export default App;
