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
}

export type MessageObjectType = {
    message: ChatMessageType
    user: ChatUserType
}