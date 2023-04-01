import React, {ChangeEvent, useRef, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import Queue from "./Queue";
import {Circle} from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  const stackRef = useRef(new Queue<string>())
  const [input, setInput] = useState("")
  const [stackEls, setStackEls] = useState<(string|null)[]>([])

  return (
    <SolutionLayout title="Очередь">
      <div className={`row ma`}>
        <div className={`row ma`}>
          <Input placeholder="Введите текст"
                 maxLength={4}
                 isLimitText={true}
                 onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                 value={input}
          />
          <Button text={"Добавить"} onClick={() => {
            stackRef.current.enqueue(input)
            setStackEls(stackRef.current.getElements())
            console.log(stackRef.current.container)
            setInput("")
          }} />
          <Button text={"Удалить"} onClick={() => {
            stackRef.current.dequeue()
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
        {stackEls.map((el,i) => (<Circle letter={el?el:""} key={i} />))}
      </div>

    </SolutionLayout>
  );
};
