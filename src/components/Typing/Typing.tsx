import React from "react";
import style from "./Typing.module.scss"
import {ChatUserType} from "../../type/types";

type PropsType = {
    typingUsers: ChatUserType[]
}

export const Typing: React.FC<PropsType> = ({typingUsers}) => {

    const userTyping = typingUsers.map(user => <span>{user.userName} is typing</span>);

    return (
        <div className={style.typing}>
            <div className={style.bubble}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={style.user}>
                {typingUsers.length > 1 ? 'Several people are typing' : userTyping}
            </div>
        </div>
    )
}