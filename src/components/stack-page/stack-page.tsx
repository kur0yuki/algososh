import React, {ChangeEvent, useRef, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import Stack from "./Stack";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";


export const StackPage: React.FC = () => {
    const stackRef = useRef(new Stack<string>())
    const [input, setInput] = useState("")
    const [stackEls, setStackEls] = useState<string[]>([])
    const [changing , setChanging] = useState<number|null>(null)
    const [loader, setLoader] = useState(false)

  return (
    <SolutionLayout title="Стек">
      <div className={`row ma pb-30`}>
          <div className={`row ma`}>
              <Input placeholder="Введите текст"
                     maxLength={4}
                     type={"number"}
                     max = {9999}
                     isLimitText={true}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                     value={input}
              />
              <Button text={"Добавить"} isLoader={loader} disabled={input.length === 0} onClick={() => {
                  setLoader(true)
                  stackRef.current.push(input)
                  setChanging(stackRef.current.getElements().length - 1)
                  setStackEls(stackRef.current.getElements())
                  console.log(stackRef.current.container)
                  setInput("")
                  setTimeout(()=> {setChanging(null);  setLoader(false)}, DELAY_IN_MS)
              }} />
              <Button text={"Удалить"} isLoader={loader} disabled={stackEls?.length === 0} onClick={() => {
                  setLoader(true)
                  setChanging(stackEls.length-1)
                  setTimeout(() => {stackRef.current.pop(); setChanging(null);  setLoader(false)},
                      DELAY_IN_MS)
              }} />
          </div>
          <Button text={"Очистить"} disabled={stackEls?.length === 0} onClick={() => {
              stackRef.current.clear()
              setStackEls(stackRef.current.getElements())
              console.log(stackRef.current.container)
          }}/>
      </div>

        <div className={`ma row`}>
        {stackEls.map((el,i) => (<Circle letter={el} key={i} index={i}
                                         head={i===stackEls.length-1? "top": null}
                                         state={i === changing? ElementStates.Changing: ElementStates.Default} />))}
        </div>

    </SolutionLayout>
  );
};
