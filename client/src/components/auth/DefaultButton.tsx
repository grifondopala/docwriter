import '@/css/auth/default-button.css'

import { CSSProperties } from 'react';

interface DefaultButtonProps{
    text: string;
    onClickHandler: () => void;
    style?: CSSProperties | undefined;
}

export function DefaultButton({text, onClickHandler, style}: DefaultButtonProps){
    return(
        <button className="default_button" onClick={onClickHandler} style={{...style}}>{text}</button>
    )
}