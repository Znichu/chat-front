import React from "react";

import style from "./style.module.scss"
import {BaseEmoji, Picker} from "emoji-mart";
import {ChatMessage} from "../ChatMessage/ChatMessage";
import {MessageObjectType} from "../../type/types";

type PropsType = {
    messages: MessageObjectType[]
    showEmoji: boolean
    addEmoji: (e: BaseEmoji) => void
    messagesAnchorRef: any
}

export const ChatMessagesBlock: React.FC<PropsType> = ({messages, showEmoji, addEmoji, messagesAnchorRef}) => {

    const messageItem = messages.map(msg => <ChatMessage urlAvatar={msg.user.urlAvatar}
                                                         userName={msg.user.userName}
                                                         time={msg.message.time}
                                                         text={msg.message.text}
                                                         key={msg.message.id}
    />);

    return (
        <>
            {messageItem}

            {showEmoji
                ? <div className={style.emoji}><Picker emojiTooltip={true} onSelect={addEmoji}/></div>
                : null
            }

            <div ref={messagesAnchorRef}></div>
        </>
    )
}