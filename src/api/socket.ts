import io from 'socket.io-client'
import {ChatMessageType, ChatUserType} from "../type/types";

export const socketAPI = {
    socket: null as null | SocketIOClient.Socket,

    createConnection() {
        this.socket = io('http://localhost:7542');
    },

    subscribe(setUsers: (users: ChatUserType[]) => void,
              setNewMessage: (message: ChatMessageType) => void,
    ) {
        this.socket?.on('ROOM:NEW_MESSAGE', setNewMessage);
        this.socket?.on('ROOM:SET_USERS', setUsers)
    },

    roomJoin(roomId: string, userName: string) {
        this.socket?.emit('ROOM:JOIN', {roomId, userName});
    },
    sendMessage(message: string, roomId: string, userName: string) {
        this.socket?.emit('ROOM:NEW_MESSAGE', {message, roomId, userName}, (error: string | null) => {
            if (error) console.log(error);
        })
    },
    typeMessage() {
        this.socket?.emit('ROOM:USER_TYPED');
    }
};