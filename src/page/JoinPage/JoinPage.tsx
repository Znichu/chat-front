import React, {ChangeEvent, useEffect, useState} from "react";
import style from "./JoinPage.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {chatSubscribe, requestJoin} from "../../store/chat-reducer";
import {RootState} from "../../store/store";
import {JoinBlock} from "../../components/JoinBlock/JoinBlock";


export const JoinPage: React.FC = () => {

    const dispatch = useDispatch();

    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');

    const isFetching = useSelector((state: RootState) => state.chat.isFetching);

    const onChangeRoomId = (e: ChangeEvent<HTMLInputElement>) => {
        setRoomId(e.currentTarget.value)
    }

    const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value)
    }

    const loginChat = () => {
        if (roomId.trim() && userName.trim()) {
            dispatch(requestJoin(roomId, userName))
        }
    }

    useEffect(() => {
        dispatch(chatSubscribe())
    }, [])

    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <div className={style.header}>
                    <h1>Welcome to the ReactJS chat</h1>
                </div>
                <JoinBlock onChangeRoomId={onChangeRoomId}
                           onChangeUserName={onChangeUserName}
                           loginChat={loginChat}
                           isFetching={isFetching}
                           roomId={roomId}
                           userName={userName}
                />
            </div>
        </div>
    )
}