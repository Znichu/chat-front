import socket from "../socket"

export const socketAPI = {
    socket: null as null | SocketIOClient.Socket,


    roomJoin (roomId: string, userName: string) {
        socket.emit('ROOM:JOIN', {roomId, userName})
    },
    destroyConnection() {
        this.socket?.disconnect();
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
    }
};