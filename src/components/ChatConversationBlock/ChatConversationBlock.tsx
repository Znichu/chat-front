import React from 'react';
import style from "../../page/ChatPage/Chat.module.scss";
import {ChatUserType} from "../../type/types";
import {ChatUser} from "../ChatUser/ChatUser";

type PropsType = {
    users: ChatUserType[]
}

export const ChatConversationBlock: React.FC<PropsType> = ({users}) => {

    const chatUser = users.map(user => <ChatUser key={user.id} urlAvatar={user.urlAvatar} userName={user.userName}/>);

    return (
        <>
            <h3><i className="zmdi zmdi-accounts"></i> Online: {users.length}</h3>
            <div className={style.separator}></div>

            {chatUser}
        </>
    );
};
