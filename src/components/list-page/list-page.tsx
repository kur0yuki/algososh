import React, {ChangeEvent, useRef, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import List from "./List";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {DELAY_IN_MS} from "../../constants/delays";
import {delay} from "../../utils";

import styles from "./list-page.module.css"

export const ListPage: React.FC = () => {
    const stackRef = useRef(new List<string>("0"))
    const [input, setInput] = useState("")
    const [changing, setChanging] = useState<number | null>(null)
    const [changingEl, setChangingEl] = useState<string | null>(null)
    const [pink, setPink] = useState<number | null>(null)
    const [green, setGreen] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [idxInput, setIdxInput] = useState<number>(-1)
    const [stackEls, setStackEls] = useState<(string | null)[]>(["0"])
    const [idxToDelete, setIdxToDelete] = useState<number | null>(null)

    return (<SolutionLayout title="Связный список">
            <div className={styles.controls}>
                <div className={`row ma`}>
                    <Input placeholder="Введите значение"
                           maxLength={4}
                           isLimitText={true}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                           value={input}
                           width={204}
                           extraClass={styles.inputs}
                           data-cy={"elem"}
                    />
                    <Button text={"Добавить в head"} isLoader={loading} extraClass={styles.button}
                            disabled={input.length === 0} onClick={() => {
                        setLoading(true)
                        setChanging(0)
                        setChangingEl(input)
                        setTimeout(() => {
                            stackRef.current.addFirst(input);
                            setStackEls(stackRef.current.getElements())
                            setChanging(null)
                            setGreen(0)
                            setLoading(false)
                            setTimeout(() => {
                                setGreen(null)
                            }, DELAY_IN_MS)
                        }, DELAY_IN_MS)
                        //stackRef.current.addFirst(input)
                        //setStackEls(stackRef.current.getElements())
                        console.log(stackRef.current.getElements())
                        setInput("")
                    }}/>
                    <Button text={"Добавить в tail"} extraClass={styles.button} isLoader={loading}
                            disabled={input.length === 0} onClick={() => {
                        setLoading(true)
                        setChanging(stackRef.current.getElements().length - 1)
                        setChangingEl(input)
                        setTimeout(() => {
                            stackRef.current.addLast(input)
                            setStackEls(stackRef.current.getElements())
                            console.log(stackEls)
                            setChanging(null)
                            setGreen(stackRef.current.getElements().length - 1)
                            setLoading(false)
                            setTimeout(() => {
                                setGreen(null)
                            }, DELAY_IN_MS)
                        }, DELAY_IN_MS)

                        setInput("")
                    }}/>
                    <Button text={"Удалить из head"} extraClass={styles.button} isLoader={loading}
                            disabled={stackRef.current.getElements().length === 1} onClick={() => {
                        setLoading(true)
                        setIdxToDelete(0)
                        setChangingEl(stackRef.current.head.value)
                        setTimeout(() => {
                            stackRef.current.removeFirst()
                            setStackEls(stackRef.current.getElements())
                            console.log(stackRef.current.getElements())
                            setIdxToDelete(null)
                            setLoading(false)
                        }, DELAY_IN_MS)

                    }}/>
                    <Button text={"Удалить из tail"} extraClass={styles.button} isLoader={loading}
                            disabled={stackRef.current.getElements().length === 1} onClick={() => {
                        setLoading(true)
                        setIdxToDelete(stackRef.current.getElements().length - 1)
                        setChangingEl(stackRef.current.tail.value)
                        setTimeout(() => {
                            stackRef.current.removeLast()
                            setStackEls(stackRef.current.getElements())
                            console.log(stackRef.current.getElements())
                            setIdxToDelete(null)
                            setLoading(false)
                        }, DELAY_IN_MS)
                    }}/>
                </div>
                <div className={`row ma pb-40`}>
                    <Input placeholder="Введите индекс"
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setIdxInput(e.target.value === "" ? -1 : parseInt(e.target.value))}
                           value={idxInput > -1 ? idxInput : ""}
                           type={"number"}
                           width={204}
                           extraClass={styles.inputs}
                           data-cy={"index"}
                    />
                    <Button text={"Добавить по индексу"} extraClass={styles.button} isLoader={loading}
                            disabled={idxInput === -1 || input.length === 0 || idxInput >= stackRef.current.getElements().length}
                            onClick={async () => {
                                setLoading(true)
                                for (let i = 0; i <= idxInput; i++) {
                                    setPink(i)
                                    setChanging(i)
                                    setChangingEl(input)
                                    await delay(DELAY_IN_MS)
                                }
                                setChanging(null)
                                stackRef.current.addAtIndex(input, idxInput)
                                setGreen(idxInput)
                                setTimeout(() => {
                                    setGreen(null);
                                    setPink(null);
                                    setLoading(false)
                                }, DELAY_IN_MS)
                                setStackEls(stackRef.current.getElements())
                                console.log(stackRef.current.getElements())
                                setIdxInput(-1)
                                setInput("")
                            }}/>
                    <Button text={"Удалить по индексу"} extraClass={styles.button} isLoader={loading}
                            disabled={idxInput === -1 || idxInput >= stackRef.current.getElements().length}
                            onClick={async () => {
                                setLoading(true)
                                setIdxInput(-1)
                                for (let i = 0; i <= idxInput; i++) {
                                    setPink(i)
                                    await delay(DELAY_IN_MS)
                                }
                                setChangingEl(stackRef.current.getElements()[idxInput])
                                setIdxToDelete(idxInput)
                                await delay(DELAY_IN_MS)
                                stackRef.current.removeAtIndex(idxInput)
                                setIdxToDelete(null)
                                setPink(null)
                                setStackEls(stackRef.current.getElements())
                                console.log(stackRef.current.getElements())
                                setLoading(false)
                            }}/>
                </div>
            </div>

            <div className={`ma row`}>
                {stackEls.map((el, idx) => {
                    return (
                        <div key={idx} className={'row'}>
                          <Circle key={idx} letter={el && idx !== idxToDelete ? el : ""}
                                  head={changing === idx && changingEl ? (
                                      <Circle letter={changingEl} isSmall={true}
                                              state={ElementStates.Changing}/>) : idx === 0 ? "head" : null}
                                  tail={idxToDelete === idx && changingEl ? (
                                      <Circle letter={changingEl} isSmall={true}
                                              state={ElementStates.Changing}/>) : idx === stackEls.length - 1 ? "tail" : null}
                                  index={idx}
                                  state={idx === green ? ElementStates.Modified : pink && idx < pink ? ElementStates.Changing : ElementStates.Default}/>
                            {idx !== stackEls.length - 1 && (<ArrowIcon key={"0" + idx}/>)}
                        </div>)
                })}
            </div>
        </SolutionLayout>);
};
