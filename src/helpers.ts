import {ChangeEvent} from "react";

export const encodeImageFileAsURL = (e: ChangeEvent<HTMLInputElement> ) => {
    // @ts-ignore
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        console.log('RESULT', reader.result)
    }
    reader.readAsDataURL(file);
}