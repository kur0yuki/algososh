import {bubbleSort, selectionSort} from "./utils";

const empty: number[] = []
const oneElement = [5]
const array = [2,5,3,1,4]
const arraySortedAsc = [1,2,3,4,5]
const arraySortedDesc = [5,4,3,2,1]

const setArray  = () => {}
const setState = setArray

describe('Test Selection Sort', () => {
    it('Empty Array', () => {
        return selectionSort(empty, setArray, setState, true, 0)
            .then(arr => expect(arr).toEqual(empty))
    })
    it('One Element Array', () => {
        return selectionSort(oneElement, setArray, setState, true, 0)
            .then(arr => expect(arr).toEqual(oneElement))
    })
    it('Normal sort', () => {
        return selectionSort(array, setArray, setState, true, 0)
            .then(arr => expect(arr).toEqual(arraySortedAsc))
    })

    it('Descending sort', () => {
        return selectionSort(array, setArray, setState, false, 0)
            .then(arr => expect(arr).toEqual(arraySortedDesc))
    })
})

describe('Test Bubble Sort', () => {
    it('Empty Array', () => {
        return bubbleSort(empty, setArray, setState, true, 0)
            .then(arr => expect(arr).toEqual(empty))
    })
    it('One Element Array', () => {
        return bubbleSort(oneElement, setArray, setState, true, 0)
            .then(arr => expect(arr).toEqual(oneElement))
    })
    it('Normal sort', () => {
        return bubbleSort(array, setArray, setState, true, 0)
            .then(arr => expect(arr).toEqual(arraySortedAsc))
    })

    it('Descending sort', () => {
        return bubbleSort(array, setArray, setState, false, 0)
            .then(arr => expect(arr).toEqual(arraySortedDesc))
    })
})