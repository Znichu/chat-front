import io from 'socket.io-client'
import {ChatUserType, MessageObjectType} from "../type/types";

export const socketAPI = {
    socket: null as null | SocketIOClient.Socket,

    createConnection() {
        this.socket = io('http://localhost:7542');
    },

    subscribe(setUsers: (users: ChatUserType[]) => void,
              setNewMessage: (message: MessageObjectType) => void,
              userTypingHandler: (user: ChatUserType[]) => void
    ) {
        this.socket?.on('ROOM:NEW_MESSAGE', setNewMessage);
        this.socket?.on('ROOM:SET_USERS', setUsers);
        this.socket?.on('ROOM:USER_TYPED', userTypingHandler);
        this.socket?.on('ROOM:USER_STOPPED_TYPING', userTypingHandler)
    },

    roomJoin(roomId: string, userName: string) {
        this.socket?.emit('ROOM:JOIN', {roomId, userName});
    },
    sendMessage(message: string, roomId: string) {
        this.socket?.emit('ROOM:NEW_MESSAGE', {message, roomId}, (error: string | null) => {
            if (error) console.log(error);
        })
    },
    typeMessage(roomId: string) {
        this.socket?.emit('ROOM:USER_TYPED', {roomId});
    },
    stopTypeMessage(roomId: string) {
        this.socket?.emit('ROOM:USER_STOPPED_TYPING', {roomId});
    },
    leaveChatRoom() {
        this.socket?.disconnect();
        this.socket = null
    }
};