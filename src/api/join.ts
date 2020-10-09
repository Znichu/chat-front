import axios from 'axios';
import {DEV_VERSION} from "../config";

export const baseURL = !DEV_VERSION
    ? 'http://localhost:7542'
    : 'https://real-time-chat-back.herokuapp.com';

const instance = axios.create({
    baseURL
});

export const joinAPI = {
    join(roomId: string, userName: string) {
        return instance.post(`/chat/rooms`, {roomId, userName})
            .then(res => res.data)
    },
    getRoomData(roomId: string) {
        return instance.get(`/chat/rooms/${roomId}`)
            .then(res => res.data)
    }
}