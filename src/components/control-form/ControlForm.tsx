import styles from "../string/string.module.css";
import {Input} from "../ui/input/input";
import React, {ChangeEvent, useState} from "react";
import {Button} from "../ui/button/button";

interface IControlFormProps {
    onClick: (args: any) => void
    maxNum?: number
}
export const ControlForm: React.FC<IControlFormProps> = ({onClick, maxNum}) => {
    const [input, setInput] = useState('')
    return (
        <div className={`${styles.controls} ma`}>
            <Input
                placeholder="Введите текст"
                maxLength={maxNum}
                isLimitText={true}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                value={input}
            />
            <Button text={"Развернуть"} onClick={()=>{
                onClick(input)
                console.log(1)
            }}/>
        </div>)
}