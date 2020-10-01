import React, {ChangeEvent, useEffect, useState} from "react";
import style from "./Chat.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {chatSubscribe, requestSendNewMessage} from "../../store/chat-reducer";

export const Chat = () => {
    const dispatch = useDispatch();

    const [message, setMessage] = useState('');

    const {users, messages, roomId, userName} = useSelector((state: RootState) => state.chat);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const sendNewMessage = () => {
        dispatch(requestSendNewMessage(message, roomId, userName))
    }

    useEffect(() => {
        dispatch(chatSubscribe())
    }, []);

    return (
        <div className={style.chat__container}>
            <header className={style.chat__header}>
                <h1><i className="fas fa-smile"></i> ChatCord</h1>
                <a href="index.html" className={style.btn}>Leave Room</a>
            </header>
            <main className={style.chat__main}>
                <div className={style.chat__sidebar}>
                    <h3><i className="fas fa-comments"></i>Online ({users.length})</h3>
                    <h2 id="room-name"></h2>
                    <h3><i className="fas fa-users"></i> Users</h3>
                    <ul id="users">
                        {users.map(u => <li>{u}</li>)}
                    </ul>
                </div>
                <div className={style.chat__messages}>
                    {
                        messages.map(message => <p>{message.text}</p>)
                    }
                </div>
            </main>
            <div className="chat-form-container">
                <input
                    type="text"
                    placeholder="Enter Message"
                    value={message}
                    required
                    autoComplete="off"
                    onChange={onChange}
                />
                <button onClick={sendNewMessage} className="btn"><i className="fas fa-paper-plane"></i> Send</button>
            </div>
        </div>
    )
}