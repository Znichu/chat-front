import React, {ChangeEvent} from "react";
import style from "./style.module.scss"


type PropsType = {
    newMessage: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    toggleEmojiPicker: () => void
    keySend: (event: React.KeyboardEvent<HTMLInputElement>) => void
    sendNewMessage: () => void
}

export const SendMessageBlock: React.FC<PropsType> = (
    {
        newMessage,
        onChange,
        toggleEmojiPicker,
        keySend,
        sendNewMessage
    }) => {

    const encodeImageFileAsURL = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            debugger
            console.log('RESULT', reader.result)
        }
        reader.readAsDataURL(file);
    }

    return (
        <>
            <div className={style.upload__block}>
                <label>
                    <input
                        type="file"
                        onChange={encodeImageFileAsURL}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor"
                         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                         className="feather feather-paperclip">
                        <path
                            d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                    </svg>
                </label>
            </div>
            <svg onClick={toggleEmojiPicker} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor"
                 stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                 className="feather feather-smile">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"></path>
            </svg>
            <input
                type="text"
                placeholder="Enter Message"
                value={newMessage}
                onChange={onChange}
                autoFocus={true}
                onKeyPress={keySend}
            />
            {newMessage.trim()
                ? <button className={style.btn} onClick={sendNewMessage}><i className="zmdi zmdi-mail-send"></i></button>
                : null
            }

        </>
    )
}