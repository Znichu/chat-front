import React from "react";
import style from "./style.module.scss"

type PropsType ={
    urlAvatar: string
    userName: string
    time: string
    text: string
}

export const ChatMessage: React.FC<PropsType> = ({userName, text, time, urlAvatar}) => {
    return (
        <div className={style.chat__msg}>
            <div className={style.chat__msg_profile}>
                <img className={style.chat__msg_img} src={urlAvatar} alt={userName}/>
                <div className={style.chat__msg_date}>
                    {time}
                </div>
            </div>
            <div className={style.chat__msg_content}>
                <div className={style.chat__msg_text}>
                    {text}
                </div>
            </div>
        </div>
    )
}