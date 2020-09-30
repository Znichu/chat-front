import socket from "../socket"

export const socketAPI = {

    roomJoin (roomId: string, userName: string) {
        debugger
        socket.emit('joinRoom', {roomId, userName})
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