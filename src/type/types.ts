export type ChatDataType = {
    users: string[]
    messages: ChatMessageType[]
}

export type ChatMessageType = {
    username: string
    text: string
    time: string
}