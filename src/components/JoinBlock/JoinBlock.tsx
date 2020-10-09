import React, {ChangeEvent} from 'react';
import style from "./JoinBlock.module.scss";
import {Button, Input} from "antd";

type PropsType = {
    onChangeRoomId: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeUserName: (e: ChangeEvent<HTMLInputElement>) => void
    loginChat: () => void
    isFetching: boolean
    roomId: string
    userName: string
}

export const JoinBlock: React.FC<PropsType> = ({onChangeRoomId, onChangeUserName, isFetching, loginChat, userName, roomId}) => {
    return (
        <div className={style.join}>
            <Input onChange={onChangeRoomId} value={roomId} placeholder="Enter ID room"/>
            <Input onChange={onChangeUserName} value={userName} placeholder="Enter your username"/>
            <Button loading={isFetching} onClick={loginChat} type="primary">
                <span>Join <i className="zmdi zmdi-sign-in"></i></span>
            </Button>
        </div>
    );
};

