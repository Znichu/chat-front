import React from "react";
import style from "./Chat.module.scss"
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export const Chat = () => {

    const users = useSelector((state: RootState) => state.chat.users);
    const messages = useSelector((state: RootState) => state.chat.messages);

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
                <div className={style.chat__messages}></div>
            </main>
            {/*<div className="chat-form-container">
                <form id="chat-form">
                    <input
                        id="msg"
                        type="text"
                        placeholder="Enter Message"
                        required
                        autoComplete="off"
                    />
                    <button className="btn"><i className="fas fa-paper-plane"></i> Send</button>
                </form>
            </div>*/}
        </div>
    )
}