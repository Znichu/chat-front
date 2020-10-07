import React from 'react';
import {JoinBlock} from "./components/JoinBlock/JoinBlock";
import {Chat} from "./components/Chat/Chat";
import {useSelector} from "react-redux";
import {RootState} from "./store/store";
import {AuthenticationRoute} from "./route/AuthenticationRoute";
import { Route, Redirect } from 'react-router-dom';


const App = () => {

    const joined = useSelector((state: RootState) => state.chat.joined);

    return (
        <>
            <Route path='/' exact render={() => <Redirect to='/join'/>}/>
            <AuthenticationRoute path={'/chat'} component={Chat}/>
            <Route path='/join' exact render={() => <JoinBlock/>}/>
            {/*{!joined ? <JoinBlock /> : <Chat/> }*/}
        </>
    );
}

export default App;
