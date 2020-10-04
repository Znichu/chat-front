export type ChatDataType = {
    users: ChatUserType[]
    messages: ChatMessageType[]
}

export type ChatUserType = {
    id: string
    userName: string
}

export type ChatMessageType = {
    id: string
    userName: string
    text: string
    time: string
}