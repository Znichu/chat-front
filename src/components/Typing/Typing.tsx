import React from "react";
import style from "./Typing.module.scss"

export const Typing = () => {
    return (
        <div className={style.typing}>
            <div className={style.bubble}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}