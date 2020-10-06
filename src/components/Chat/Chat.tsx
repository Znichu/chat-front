import React, {ChangeEvent, useState} from "react";
import style from "./Chat.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {requestSendNewMessage, requestStopTypeMessage, requestTypeMessage} from "../../store/chat-reducer";

export const Chat = () => {
    const dispatch = useDispatch();

    const [newMessage, setMessage] = useState('');

    const {users, messages, roomId, userName, typingUsers} = useSelector((state: RootState) => state.chat);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
        dispatch(requestTypeMessage(roomId));
        if (e.target.value === '') {
            dispatch(requestStopTypeMessage(roomId))
        }
    }

    const sendNewMessage = () => {
        if (newMessage !== '') {
            dispatch(requestSendNewMessage(newMessage, roomId, userName));
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

    const messageItem = messages.map(msg =>
        <div key={msg.id} className={style.message}>
            <p className={style.meta}>
                {msg.userName}
                <span>{msg.time}</span>
            </p>
            <p>
                {msg.text}
            </p>
        </div>);

    const userTyping = typingUsers.map(user => <span>{user.userName} is typing</span>);

    return (
        <div className={style.chat__wrapper}>
            <div className={style.chat__container}>
                <header className={style.chat__header}>
                    <h1><i className="fas fa-smile"></i> Chat</h1>

                    {
                        typingUsers.length !== 0
                            ?
                            <div className={style.typers}>
                                {typingUsers.length > 1 ? 'Several people are typing' : userTyping}
                            </div>
                            : null
                    }

                    <a href="index.html" className={style.btn}>Leave Room</a>
                </header>
                <main className={style.chat__main}>
                    <div className={style.chat__sidebar}>
                        <h3><i className="fas fa-comments"></i> Online: {users.length}</h3>
                        <h3><i className="fas fa-users"></i> Users</h3>
                        <ul id="users">
                            {users.map(user => <li key={user.id}>{user.userName}</li>)}
                        </ul>
                    </div>
                    <div className={style.chat__messages}>
                        {messageItem}
                    </div>
                </main>
                <div className={style.chat__form}>
                    <input
                        type="text"
                        placeholder="Enter Message"
                        value={newMessage}
                        required
                        autoComplete="off"
                        onChange={onChange}
                        autoFocus={true}
                        onKeyPress={keySend}
                    />
                    <button onClick={sendNewMessage} className={style.btn}><i className="fas fa-paper-plane"></i> Send
                    </button>
                </div>
            </div>
        </div>
    )
}
