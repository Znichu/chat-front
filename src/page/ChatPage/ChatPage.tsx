import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import style from "./Chat.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {requestSendNewMessage, requestStopTypeMessage, requestTypeMessage} from "../../store/chat-reducer";
import {SendMessageBlock} from "../../components/SendMessageBlok/SendMessageBlock";
import 'emoji-mart/css/emoji-mart.css';
import {BaseEmoji} from 'emoji-mart'
import {ChatMessagesBlock} from "../../components/ChatMessagesBlock/ChatMessagesBlock";
import {ChatHeaderBlock} from "../../components/ChatHeaderBlock/ChatHeaderBlock";
import {ChatConversationBlock} from "../../components/ChatConversationBlock/ChatConversationBlock";


export const ChatPage = () => {
    const dispatch = useDispatch();

    const {users, messages, roomId, typingUsers} = useSelector((state: RootState) => state.chat);

    const [newMessage, setMessage] = useState('');
    const [newImg, setImg] = useState<string | ArrayBuffer | null>(null);
    const [showEmoji, setShowEmojiPicker] = useState(false);
    const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    const messagesAnchorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isAutoScrollActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages, typingUsers]);

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
        let message = {text: newMessage, img: newImg}
        if (newMessage.trim() !== '') {
            dispatch(requestSendNewMessage(message, roomId));
            setMessage('');
            setImg(null);
            dispatch(requestStopTypeMessage(roomId));
        }
        if (showEmoji) hideEmojiPicker();
    }

    const keySend = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendNewMessage();
            dispatch(requestStopTypeMessage(roomId))
        }
    }

    const addImgMessage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImg(reader.result)
            }
            reader.readAsDataURL(file);
        }
    }

    const addEmoji = (e: BaseEmoji) => {
        let emoji = e.native;
        setMessage(newMessage + emoji);
    };

    const showEmojiPicker = () => {
        setShowEmojiPicker(true)
    }
    const hideEmojiPicker = () => {
        setShowEmojiPicker(false)
    }

    return (
        <div className={style.chat}>
            <div className={style.header}>
                <ChatHeaderBlock typingUsers={typingUsers}/>
            </div>
            <div className={style.wrapper}>
                <div className={style.conversation__area}>
                    <ChatConversationBlock users={users}/>
                </div>
                <div className={style.chat__area} onScroll={scrollMessages}>
                    <div className={style.chat__area_main}>
                        <ChatMessagesBlock addEmoji={addEmoji}
                                           messages={messages}
                                           messagesAnchorRef={messagesAnchorRef}
                                           showEmoji={showEmoji}
                        />
                    </div>
                    <div className={style.chat__area_footer}>
                        <SendMessageBlock
                            addImgMessage={addImgMessage}
                            onChange={onChange}
                            keySend={keySend}
                            newMessage={newMessage}
                            sendNewMessage={sendNewMessage}
                            showEmojiPicker={showEmojiPicker}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
