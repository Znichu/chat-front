import React from "react";
import {Typing} from "../Typing/Typing";
import style from "../../page/Chat/Chat.module.scss";
import {leaveChatRoom} from "../../store/chat-reducer";
import {useDispatch} from "react-redux";
import {ChatUserType} from "../../type/types";

type PropsType = {
    typingUsers: ChatUserType[]
}

export const ChatHeaderBlock: React.FC<PropsType> = ({typingUsers}) => {

    const dispatch = useDispatch();

    return (
        <>
            <h1><i className="zmdi zmdi-comments"></i> React Chat</h1>

            {
                typingUsers.length !== 0
                    ? <Typing typingUsers={typingUsers}/>
                    : null
            }
            <button className={style.btn} onClick={() => dispatch(leaveChatRoom())}>
                <span><i className="fas fa-sign-out-alt"></i></span>
            </button>
        </>
    )
}