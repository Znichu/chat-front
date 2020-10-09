import React from "react";

import style from "./style.module.scss"
import {BaseEmoji, Picker} from "emoji-mart";

type PropsType = {
    messageItem: any
    showEmojiPicker: boolean
    addEmoji: (e: BaseEmoji) => void
    messagesAnchorRef: any
}

export const ChatMessagesBlock: React.FC<PropsType> = ({messageItem, showEmojiPicker, addEmoji, messagesAnchorRef}) => {
    return (
        <>
            {messageItem}

            {showEmojiPicker
                ? <div className={style.emoji}><Picker emojiTooltip={true} onSelect={addEmoji}/></div>
                : null
            }

            <div ref={messagesAnchorRef}></div>
        </>
    )
}