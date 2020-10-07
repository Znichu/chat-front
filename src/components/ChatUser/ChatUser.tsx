import React from "react";

import style from "./style.module.scss"

type PropsType = {
    urlAvatar: string
    userName: string
}

export const ChatUser: React.FC<PropsType> = ({userName, urlAvatar}) => {
    return(
        <div className={style.user}>
            <img className={style.user__img} src={urlAvatar} alt="avatar"/>
            <div className={style.user__name}>{userName}</div>
        </div>
    )
}
