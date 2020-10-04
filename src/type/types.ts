export type ChatDataType = {
    users: ChatUserType[]
    messages: ChatMessageType[]
}

export type ChatUserType = {
    id: string
    userName: string
    urlAvatar: string
}

export type ChatMessageType = {
    id: string
    userName: string
    text: string
    time: string
}