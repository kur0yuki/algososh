import React, {ChangeEvent, useRef, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import List from "./List";

export const ListPage: React.FC = () => {
  const stackRef = useRef(new List<string>(""))
  const [input, setInput] = useState("")
  const [idxInput, setIdxInput] = useState<number>(-1)
  const [stackEls, setStackEls] = useState<(string|null)[]>([])

  return (
    <SolutionLayout title="Связный список">
      <div className={`row ma`}>
        <Input placeholder="Введите значение"
               maxLength={4}
               isLimitText={true}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
               value={input}
        />
        <Button text={"Добавить в head"} onClick={() => {
          stackRef.current.addFirst(input)
          setStackEls(stackRef.current.getElements())
          console.log(stackRef.current.getElements())
          setInput("")
        }} />
        <Button text={"Добавить в tail"} onClick={() => {
          stackRef.current.addLast(input)
          setStackEls(stackRef.current.getElements())
          console.log(stackRef.current.getElements())
          setInput("")
        }}/>
        <Button text={"Удалить из head"} onClick={() => {
          stackRef.current.removeFirst()
          setStackEls(stackRef.current.getElements())
          console.log(stackRef.current.getElements())
          setInput("")
        }} />
        <Button text={"Удалить из tail"} onClick={() => {
          stackRef.current.removeLast()
          setStackEls(stackRef.current.getElements())
          console.log(stackRef.current.getElements())
        }}/>
      </div>
      <div className={`row ma`}>
        <Input placeholder="Введите индекс"
               onChange={(e: ChangeEvent<HTMLInputElement>) => setIdxInput(parseInt(e.target.value))}
               value={idxInput > -1 ? idxInput:""}
        />
        <Button text={"Добавить по индексу"} onClick={() => {
          stackRef.current.addAtIndex(input, idxInput!!)
          setStackEls(stackRef.current.getElements())
          console.log(stackRef.current.getElements())
          setInput("")
        }} />
        <Button text={"Удалить по индексу"} onClick={() => {
          stackRef.current.removeAtIndex(idxInput!!)
          setStackEls(stackRef.current.getElements())
          console.log(stackRef.current.getElements())
        }}/>
      </div>
    </SolutionLayout>
  );
};
