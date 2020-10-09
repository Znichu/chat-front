import React, {ChangeEvent, useEffect, useState} from "react";
import style from "./JoinBlock.module.scss"
import {Button, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {chatSubscribe, requestJoin} from "../../store/chat-reducer";
import {RootState} from "../../store/store";


export const JoinBlock: React.FC = () => {

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
        if (roomId && userName ) {
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
                <div className={style.join}>
                    <Input onChange={onChangeRoomId} value={roomId} placeholder="Enter ID room"/>
                    <Input onChange={onChangeUserName} value={userName} placeholder="Enter your username"/>
                    <Button loading={isFetching} onClick={loginChat} type="primary">
                        <span>Join <i className="zmdi zmdi-sign-in"></i></span>
                    </Button>
                </div>

            </div>
        </div>
    )
}