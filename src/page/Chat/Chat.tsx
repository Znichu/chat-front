import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import style from "./Chat.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {
    leaveChatRoom,
    requestSendNewMessage,
    requestStopTypeMessage,
    requestTypeMessage
} from "../../store/chat-reducer";
import {Typing} from "../../components/Typing/Typing";
import {ChatMessage} from "../../components/ChatMessage/ChatMessage";
import {ChatUser} from "../../components/ChatUser/ChatUser";
import {SendMessageBlock} from "../../components/SendMessageBlok/SendMessageBlock";
import 'emoji-mart/css/emoji-mart.css';
import {BaseEmoji, Picker} from 'emoji-mart'
import {ChatMessagesBlock} from "../../components/ChatMessagesBlock/ChatMessagesBlock";

export const Chat = () => {
    const dispatch = useDispatch();

    const [newMessage, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);


    const {users, messages, roomId, typingUsers} = useSelector((state: RootState) => state.chat);

    useEffect(() => {
        if (isAutoScrollActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages, typingUsers]);

    const messagesAnchorRef = useRef<HTMLDivElement>(null);

    //Auto scroll messages
    const scrollMessages = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget;
        const maxScrollPosition = element.scrollHeight - element.clientHeight;
        if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 2) {
            setIsAutoScrollActive(true)
        } else {
            setIsAutoScrollActive(false)
        }
        setLastScrollTop(element.scrollTop)
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
        dispatch(requestTypeMessage(roomId));
        if (e.target.value.trim() === '') {
            dispatch(requestStopTypeMessage(roomId))
        }
    }

    const sendNewMessage = () => {
        if (newMessage.trim() !== '') {
            dispatch(requestSendNewMessage(newMessage, roomId));
            setMessage('');
            dispatch(requestStopTypeMessage(roomId));
            toggleEmojiPicker()
        }
    }

    const keySend = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendNewMessage();
            dispatch(requestStopTypeMessage(roomId))
        }
    }

    const addEmoji = (e: BaseEmoji) => {
        let emoji = e.native;
        setMessage(newMessage + emoji);
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }

    const messageItem = messages.map(msg => <ChatMessage urlAvatar={msg.user.urlAvatar}
                                                         userName={msg.user.userName}
                                                         time={msg.message.time}
                                                         text={msg.message.text}
                                                         key={msg.message.id}
        />
    );
    const chatUser = users.map(user => <ChatUser key={user.id} urlAvatar={user.urlAvatar} userName={user.userName}/>);

    return (
        <div className={style.chat}>
            <div className={style.header}>
                <h1><i className="zmdi zmdi-comments"></i> React Chat</h1>

                {
                    typingUsers.length !== 0
                        ? <Typing typingUsers={typingUsers}/>
                        : null
                }
                <button className={style.btn} onClick={() => dispatch(leaveChatRoom())}>
                    <span><i className="fas fa-sign-out-alt"></i></span>
                </button>
            </div>
            <div className={style.wrapper}>
                <div className={style.conversation__area}>
                    <h3><i className="zmdi zmdi-accounts"></i> Online: {users.length}</h3>
                    <div className={style.separator}></div>

                    {chatUser}

                </div>
                <div className={style.chat__area} onScroll={scrollMessages}>
                    <div className={style.chat__area_main}>
                        <ChatMessagesBlock addEmoji={addEmoji}
                                           messageItem={messageItem}
                                           messagesAnchorRef={messagesAnchorRef}
                                           showEmojiPicker={showEmojiPicker}
                        />
                    </div>
                    <div className={style.chat__area_footer}>
                        <SendMessageBlock
                            onChange={onChange}
                            keySend={keySend}
                            newMessage={newMessage}
                            sendNewMessage={sendNewMessage}
                            toggleEmojiPicker={toggleEmojiPicker}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
