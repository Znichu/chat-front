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
import {Typing} from "../Typing/Typing";
import {ChatMessage} from "../ChatMessage/ChatMessage";
import {ChatUser} from "../ChatUser/ChatUser";
import {UploadFile} from "../UploadFile/UploadFile";

export const Chat = () => {
    const dispatch = useDispatch();

    const [newMessage, setMessage] = useState('');
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
        if (e.target.value === '') {
            dispatch(requestStopTypeMessage(roomId))
        }
    }

    const sendNewMessage = () => {
        if (newMessage !== '') {
            dispatch(requestSendNewMessage(newMessage, roomId));
            setMessage('');
            dispatch(requestStopTypeMessage(roomId))
        }
    }

    const keySend = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendNewMessage();
            dispatch(requestStopTypeMessage(roomId))
        }
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
                <h1><i className="fab fa-react"></i> React Chat</h1>

                {
                    typingUsers.length !== 0
                        ? <Typing typingUsers={typingUsers}/>
                        : null
                }
                <button className={style.btn} onClick={() => dispatch(leaveChatRoom())}>
                    Leave Room
                </button>
            </div>
            <div className={style.wrapper}>
                <div className={style.conversation__area}>
                    <h3><i className="fas fa-comments"></i> Online: {users.length}</h3>
                    <div className={style.separator}></div>
                    {chatUser}
                </div>
                <div className={style.chat__area} onScroll={scrollMessages}>
                    <div className={style.chat__area_main}>
                        {messageItem}
                        <div ref={messagesAnchorRef}></div>
                    </div>
                    <div className={style.chat__area_footer}>

                        <UploadFile/>

{/*                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor"
                             strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                             className="feather feather-paperclip">
                            <path
                                d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                        </svg>*/}


                        <input
                            type="text"
                            placeholder="Enter Message"
                            value={newMessage}
                            onChange={onChange}
                            autoFocus={true}
                            onKeyPress={keySend}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
