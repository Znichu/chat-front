import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:7542/chat"
    //baseURL: "https://real-time-chat-back.herokuapp.com/chat"
});

export const joinAPI = {
    join(roomId: string, userName: string) {
        return instance.post(`/rooms`, {roomId, userName})
            .then(res => res.data)
    },
    getRoomData(roomId: string) {
        return instance.get(`/rooms/${roomId}`)
            .then(res => res.data)
    }
}