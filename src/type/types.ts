export type ChatDataType = {
    users: ChatUserType[]
    messages: MessageObjectType[]
}

export type ChatUserType = {
    id: string
    userName: string
    urlAvatar: string
}

export type ChatMessageType = {
    id: string
    text: string
    time: string
    img: string | null
}

export type MessageObjectType = {
    message: ChatMessageType
    user: ChatUserType
}

export type MessageType = {
    text: string
    img: string | ArrayBuffer | null
}