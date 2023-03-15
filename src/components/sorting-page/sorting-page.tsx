import React, {useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Column} from "../ui/column/column";
import {bubbleSort, bubbleSortStep, selectionSort} from "./utils";
import {delay} from "../../utils";
import {DELAY_IN_MS} from "../../constants/delays";
import {Button} from "../ui/button/button";

export const SortingPage: React.FC = () => {
  const createArray = () => [...Array(5)].map(() => Math.ceil(Math.random() * 100))
  const [array, setArray] = useState(createArray())
  const [state, setState] = useState({
    i:0,
    j:0,
    idx: 0
  })
  const [nextIteration, setNext] = useState(0)
  const [isInProgress, setIsInProgress] = useState(true)
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
      switch(sortAlgorithm){
        case 'bubbleSort': bubbleSort(array, setArray, setState).finally(() => {setIsInProgress(false)})
              break
        case 'selectionSort': selectionSort(array, setArray, setState).finally(() => {setIsInProgress(false)})
          break
      }
    }
  }, [isInProgress])


  return (
    <SolutionLayout title="Сортировка массива">
      <div className={"sort__controls"}>
        <Button onClick={()=> {}} text={''} />
      </div>
      {array.length>0 &&
          <div className={'row'}>
            {array.map(val => <Column index={val} key={val} />)}
          </div>
      }
    </SolutionLayout>
  );
};
