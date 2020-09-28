import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:7542"
    //baseURL: "https://real-time-chat-back.herokuapp.com/"
});

export const joinAPI = {
    join(roomId: string, userName: string) {
        return instance.post(`/rooms`, {roomId, userName})
            .then(res => res.data)
    }
}