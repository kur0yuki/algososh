import React, {ChangeEvent, useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./string.module.css"
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils";
import {DELAY_IN_MS} from "../../constants/delays";

export const StringComponent: React.FC = () => {
    const [state, setState] = useState<Array<string>>([])
    const [input, setInput] = useState("")
    const [idx, setIdx] = useState(-1)
    const len = useMemo(() => state.length, [state])

    const startReverse = async (state: Array<string>, idx: number, len: number) => {
        setIdx(idx)
        console.log(idx)
        await delay(DELAY_IN_MS)
        console.log(state)
        const tmpState = [...state]
        console.log(tmpState)
        tmpState[idx] = state[len - idx - 1]
        console.log(tmpState)
        tmpState[len - idx - 1] = state[idx]
        console.log(tmpState)
        setState(tmpState)
        if (idx < (len / 2 - 1)) await startReverse(tmpState, idx + 1, len)
        else setIdx(idx+1)
    }

    return (
        <SolutionLayout title="Строка">
            <section className={styles.centred}>
                <div className={`${styles.controls} mb-75`}>
                    <Input
                        placeholder="Введите текст"
                        maxLength={11}
                        isLimitText={true}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                        value={input}
                    />
                    <Button text={"Развернуть"} onClick={() => {
                        //console.log(Array.of(input.split('')))
                        setState(input.split(""))
                        startReverse(input.split(""), 0, input.length)
                    }}/>
                </div>

                {len > 0 &&
                    <section className={styles.stringRow}>
                        {state.map((char, i) => <Circle letter={char}
                                                        key={i}
                                                        state={(i === idx || i === len - 1 - idx)  && idx<len/2 ? ElementStates.Changing :
                                                            i < idx || i > len - 1 - idx|| idx>len/2 ? ElementStates.Modified :
                                                                ElementStates.Default}
                        />)}
                    </section>
                }
            </section>
        </SolutionLayout>
    );
};

