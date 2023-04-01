import React, {ChangeEvent, useRef, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import Stack from "./Stack";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";


export const StackPage: React.FC = () => {
    const stackRef = useRef(new Stack<string>())
    const [input, setInput] = useState("")
    const [stackEls, setStackEls] = useState<string[]>([])

  return (
    <SolutionLayout title="Стек">
      <div className={`row ma`}>
          <div className={`row ma`}>
              <Input placeholder="Введите текст"
                     maxLength={4}
                     isLimitText={true}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                     value={input}
              />
              <Button text={"Добавить"} onClick={() => {
                  stackRef.current.push(input)
                  setStackEls(stackRef.current.getElements())
                  console.log(stackRef.current.container)
                  setInput("")
              }} />
              <Button text={"Удалить"} onClick={() => {
                  stackRef.current.pop()
                  setStackEls(stackRef.current.getElements())
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
        {stackEls.map((el,i) => (<Circle letter={el} key={i} />))}
        </div>

    </SolutionLayout>
  );
};
