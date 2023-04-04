import React, {ChangeEvent, useRef, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import Queue from "./Queue";
import {Circle} from "../ui/circle/circle";
import {DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";

export const QueuePage: React.FC = () => {
  const stackRef = useRef(new Queue<string>())
  const [loader, setLoader] = useState(false)
  const [changing , setChanging] = useState<number|null>(null)
  const [input, setInput] = useState("")
  const [stackEls, setStackEls] = useState<(string|null)[]>(Array(7).fill(null))

  return (
    <SolutionLayout title="Очередь">
      <div className={`row ma  pb-20`}>
        <div className={`row ma`} >
          <Input placeholder="Введите текст"
                 maxLength={4}
                 type={"number"}
                 max = {9999}
                 isLimitText={true}
                 onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                 value={input}
          />
          <Button text={"Добавить"} isLoader={loader} disabled={input.length === 0} onClick={() => {
            stackRef.current.enqueue(input)
            setChanging(stackRef.current.tailIdx)
            setLoader(true)
            setTimeout(() => { setChanging(null); setLoader(false)}, DELAY_IN_MS)
            setStackEls(stackRef.current.getElements())
            console.log(stackRef.current.container)
            setInput("")
          }} />
          <Button text={"Удалить"} isLoader={loader} onClick={() => {
            setChanging(stackRef.current.headIdx)
            setLoader(true)
            setTimeout(() => { stackRef.current.dequeue(); setChanging(null);  setLoader(false) },
                DELAY_IN_MS)
            // stackRef.current.dequeue()
            //setStackEls(stackRef.current.getElements())
            console.log(stackRef.current.container)
          }}/>
        </div>
        <Button text={"Очистить"} onClick={() => {
          stackRef.current.clear()
          setStackEls(stackRef.current.getElements())
          console.log(stackRef.current.container)
        }}/>
      </div>
      <div className={`ma row`}>
        {stackEls.map((el,i) => (<Circle letter={el?el:""} key={i} index={i}
                                         head={i===stackRef.current.headIdx? "head": null}
                                         tail={ i===stackRef.current.tailIdx? "tail":null}
                                         state={i === changing? ElementStates.Changing: ElementStates.Default } />))}
      </div>

    </SolutionLayout>
  );
};
