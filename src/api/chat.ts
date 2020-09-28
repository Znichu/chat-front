import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8080"
    // baseURL: "https://api.themoviedb.org/3/"
});

export const loginAPI = {
    login(roomId: string, userName: string) {
        debugger
        return instance.post(`/rooms`, {roomId, userName})
            .then(res => res.data)
    }
}