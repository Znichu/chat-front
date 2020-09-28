import React, {ChangeEvent, useState} from "react";
import style from "./JoinBlock.module.scss"
import {Button, Input} from "antd";
import {useDispatch} from "react-redux";
import {requestIsAuth} from "../../store/chat-reducer";


export const JoinBlock: React.FC = () => {

    const dispatch = useDispatch();

    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');

    const onChangeRoomId = (e: ChangeEvent<HTMLInputElement>) => {
        setRoomId(e.currentTarget.value)
    }

    const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value)
    }

    const loginChat = () => {
        dispatch(requestIsAuth(roomId, userName))
    }

        return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <div className={style.header}>
                    <h1>Welcome to the ReactJS chat</h1>
                </div>
                <div className={style.join}>
                    <Input onChange={onChangeRoomId} value={roomId} placeholder="Enter ID room"/>
                    <Input onChange={onChangeUserName} value={userName} placeholder="Enter your username"/>
                    <Button onClick={loginChat} type="primary">SEND</Button>
                </div>

            </div>
        </div>
    )
}