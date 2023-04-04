import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Column} from "../ui/column/column";
import {bubbleSort, selectionSort} from "./utils";
import {Button} from "../ui/button/button";
import {RadioInput} from "../ui/radio-input/radio-input";
import {ElementStates} from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const createArray = () => [...Array(5)].map(() => Math.ceil(Math.random() * 100))
  const [array, setArray] = useState(createArray())
  const [isAsc, setAsc] = useState(true)
  const [state, setState] = useState({
    i:-1,
    j:-1,
    idx: 0
  })
  const [isInProgress, setIsInProgress] = useState(false)
  const [isSorted, setIsSorted] = useState(false)
  const [sortAlgorithm, setSortAlgorithm] = useState('bubbleSort')

  // useEffect(()=> {
  //   console.log(array)
  //   console.log(state)
  //   const {tmpArray, i, j}:{ tmpArray: Array<number>; i: number; j: number } = bubbleSortStep(array, state)
  //
  //   setArray(tmpArray)
  //   setState({...state, i: (i+1)%5, j: j+~~(i/4)})
  //   console.log(i, j)
  //   delay(DELAY_IN_MS).then(()=>{if (j!==array.length || i<1) setNext(n => ++n)})
  //   // if (j!==array.length || i<1) setNext(n => ++n)
  // },[nextIteration])

  useEffect(() => {
    if (isInProgress) {
      setIsSorted(false)
      switch(sortAlgorithm){
        case 'bubbleSort': bubbleSort(array, setArray, setState, isAsc)
            .finally(() => {setIsInProgress(false); setIsSorted(true)})
              break
        case 'selectionSort': selectionSort(array, setArray, setState, isAsc)
            .finally(() => {setIsInProgress(false); setIsSorted(true)})
          break
      }
    }
  }, [isInProgress, sortAlgorithm, isAsc])

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={"row  pb-20 ma"}>
        <RadioInput label={"Пузырек"} name={"sort"} value={"bubbleSort"}
                    defaultChecked={sortAlgorithm === "bubbleSort"}
                    onClick={() => {setSortAlgorithm("bubbleSort") }} />
        <RadioInput label={"Выбор"} name={"sort"} value={"selectionSort"}
                     onClick={() => {setSortAlgorithm("selectionSort") }} />

        <Button onClick={()=> {setAsc(true); setIsInProgress(true)}} text={'По возрастанию'} isLoader={isInProgress} />
        <Button onClick={()=> {setAsc(false); setIsInProgress(true)}} text={'По убыванию'} isLoader={isInProgress} />

        <Button onClick={()=> {
          setArray(createArray())
          setIsSorted(false)
        }} text={'Новый массив'} isLoader={isInProgress}
        />
      </div>
      

      {array.length>0 &&
          <div className={'row'}>
            {array.map((val, idx) =>
                (<Column index={val} key={idx}
                         state={ isSorted? ElementStates.Modified: !isInProgress? ElementStates.Default: sortAlgorithm === 'selectionSort'?
                             idx === state.i|| idx === state.j ? ElementStates.Changing :
                                 idx < state.i ? ElementStates.Modified: ElementStates.Default :
                             idx === state.i || idx === state.i +1 ?  ElementStates.Changing :
                                 idx> state.idx? ElementStates.Modified: ElementStates.Default
                }
            />))}
          </div>
      }
    </SolutionLayout>
  );
};
