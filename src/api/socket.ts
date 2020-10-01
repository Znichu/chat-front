import io from 'socket.io-client'
import {ChatDataType, ChatMessageType} from "../type/types";

export const socketAPI = {
    socket: null as null | SocketIOClient.Socket,

    createConnection() {
        this.socket = io('http://localhost:7542');
    },

    subscribe(setUsers: (data: ChatDataType) => void,
              setNewMessage: (message: ChatMessageType) => void
              ){
        this.socket?.on('ROOM:DATA_ROOM', setUsers);
        this.socket?.on('ROOM:NEW_MESSAGE', setNewMessage);
    },

    roomJoin (roomId: string, userName: string,
              setChatData: (data: ChatDataType) => void,
    ) {
        this.socket?.emit('ROOM:JOIN', {roomId, userName});
        this.socket?.on('ROOM:DATA_ROOM', setChatData);

    },
    sendMessage(message: string, roomId: string, userName: string) {
        this.socket?.emit('ROOM:NEW_MESSAGE', {message, roomId, userName}, (error: string | null) => {
            if (error) console.log(error);
        })
    },
/*    destroyConnection() {
        socket?.disconnect();
        this.socket = null
    },
    sendName(name: string) {
        this.socket?.emit('client-name-sent', name, (error: string | null) => {
            console.log(error);
            if (error) alert(error);
        })
    },
    sendMessage(message: string) {
        this.socket?.emit('client-message-sent', message, (error: string | null) => {
            if (error) alert(error);
        })
    },
    typeMessage() {
        this.socket?.emit('client-typed');
    }*/
};