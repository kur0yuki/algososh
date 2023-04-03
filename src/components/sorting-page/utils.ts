import {delay} from "../../utils";
import {DELAY_IN_MS} from "../../constants/delays";

type sortFunc = (
    array: Array<number>,
    f1: (array: Array<number>) => void,
    f2: (state:{ i: number, j: number, idx: number}) => void,
    sortAsc?: boolean
)=> Promise<void>

export const bubbleSort:sortFunc = async (arrayInitial: Array<number>, setArray, setIndex, sortAsc=true) => {
    const array = [...arrayInitial]
    for (let j = 0; j < array.length; j++) {
        for (let i = 0; i < array.length - 1 - j; i++) {
            setIndex({i, j, idx:  array.length - 1 - j})
            await delay(DELAY_IN_MS)
            if ((array[i] > array[i + 1]) === sortAsc) [array[i], array[i + 1]] = swap(array[i], array[i + 1])
            setArray(array)
            //setIndex({i,j, idx: 0})
        }
    }
    setIndex({i: array.length, j: array.length, idx:  0})
    //return array//.sort()
}

export const bubbleSortStep: (arrayInitial: Array<number>, state: { i: number; j: number }) => { tmpArray: Array<number>; i: number; j: number } = (arrayInitial, state) => {
    const tmpArray: Array<number> = [...arrayInitial]
    let {i, j} = state
    if (tmpArray[i] > tmpArray[i + 1]) [tmpArray[i], tmpArray[i + 1]] = swap(tmpArray[i], tmpArray[i + 1])
    return {tmpArray, i, j}
}

export const selectionSort:sortFunc = async (arrayInitial, setArray, setState, sortAsc = true) => {
    const array = [...arrayInitial]
    for (let i = 0; i < array.length; i++) {
        let idx = i
        for (let j = i; j < array.length; j++) {
            setState({i, j, idx: 0})
            if ((array[j] < array[idx])===sortAsc) idx = j
        }
        console.log(array[i], array[idx]);
        [array[i], array[idx]] = swap(array[i], array[idx])
        console.log(array[i], array[idx])
        console.log(array)
        setArray(array)
        await delay(DELAY_IN_MS)
    }
    setState({i: array.length, j: array.length, idx: 0})
    //return array
}
export const selectionSortStep = (arrayInitial: Array<number>, state: { i: number; j: number; idx: number }) => {
    let {i, j, idx} = state
    const array = [...arrayInitial];
    //if (j===i) idx = 0
    if (arrayInitial[j] < arrayInitial[idx]) idx = j
    if (++j >= arrayInitial.length) {
        //i++
        [array[i], array[idx]] = swap(array[idx], array[i])
        j=++i
    }
    return {tmpArray: array, i, j, idx}
}
const swap: <T>(a: T, b: T) => T[] = (a, b) => [b, a]