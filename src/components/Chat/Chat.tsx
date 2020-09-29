import React from "react";
import style from "./Chat.module.scss"

export const Chat = () => {
    return (
        <div className={style.chat__container}>
            <header className={style.chat__header}>
                <h1><i className="fas fa-smile"></i> ChatCord</h1>
                <a href="index.html" className={style.btn}>Leave Room</a>
            </header>
            <main className={style.chat__main}>
                <div className={style.chat__sidebar}>
                    <h3><i className="fas fa-comments"></i> Room Name:</h3>
                    <h2 id="room-name"></h2>
                    <h3><i className="fas fa-users"></i> Users</h3>
                    <ul id="users"></ul>
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