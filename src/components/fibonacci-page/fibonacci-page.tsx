import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Circle} from "../ui/circle/circle";
import {delay} from "../../utils";
import {DELAY_IN_MS} from "../../constants/delays";
import styles from "../string/string.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";

export const FibonacciPage: React.FC = () => {
    const [num, setNum] = useState(0)
    const [input, setInput] = useState('')
    const [loader, setLoader] = useState(false)
    const [fibArray, setArray] = useState<Array<number>>([])

    const fillArray = (num: number) => {
        const fibArray = Array(num)
        for (let i = 0; i < num; i++) {
            if (i < 2) fibArray[i] = 1
            else fibArray[i] = (fibArray[i - 1] + fibArray[i - 2])
            //await delay(DELAY_IN_MS)
        }
        return fibArray
    }
    const fastArray:Array<number> = useMemo(()=>(fillArray(num)), [num])

    const fillSlowArray = async (fastArray: Array<number>)=>{
        for (let i = 1; i <= num; i++) {
            setArray(fastArray.slice(0,i))
            await delay(DELAY_IN_MS)
        }
    }

    useEffect(()=> {
        if (num > 0) {
            console.log(fastArray)
            //fillArray(num, fastArray)
            fillSlowArray(fastArray).then(() => {setLoader(false)})
            console.log(fibArray)
        }
    }, [num])
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
        <section className={'ma'}>
            <div className={`${styles.controls} ma`}>
                <Input
                    placeholder="Введите текст"
                    maxLength={19}
                    isLimitText={true}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                    value={input}
                />
                <Button text={"Рассчитать"} isLoader={loader} onClick={()=>{
                    setLoader(true)
                    setNum(Number.parseInt(input)+1)
                    //console.log(1)
                }}/>
            </div>
            {fibArray.length >0 &&
                <div className={`ma row`}>
                    {fibArray.map((letter, idx) => (<Circle  key = {idx} letter={letter.toString()} index={idx} />))}
                </div>
            }
        </section>
    </SolutionLayout>
  );
};
