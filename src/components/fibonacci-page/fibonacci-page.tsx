import React, {useEffect, useMemo, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {ControlForm} from "../control-form/ControlForm";
import {Circle} from "../ui/circle/circle";
import {delay} from "../../utils";
import {DELAY_IN_MS} from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
    const [num, setNum] = useState(0)
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
            fillSlowArray(fastArray)
            console.log(fibArray)
        }
    }, [num])
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
        <section className={'ma'}>
            <ControlForm onClick={input => {
                setNum(Number.parseInt(input))
                //console.log(fibArray)
            }} maxNum={19} />
            {fibArray.length >0 &&
                <div className={`ma row`}>
                    {fibArray.map((letter, idx) => (<Circle  key = {idx} letter={letter.toString()} />))}
                </div>
            }
        </section>
    </SolutionLayout>
  );
};
