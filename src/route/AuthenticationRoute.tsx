import React from "react"
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import {RootState} from "../store/store";

type Props = {
    path: string
    component: React.FC
    exact?: boolean
}

export const AuthenticationRoute: React.FC<Props> = ({component: Component, path, exact, ...rest}) => {
    const joined = useSelector((state: RootState) => state.chat.joined);
    return (
        <Route
            path={path}
            exact={exact}
            render={() =>
                joined ? <Component { ...rest } /> : <Redirect to={'/join'}/>
            }
        />
    )
}
