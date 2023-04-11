import {reverseString} from "./util";

const arrayFromString = (str: string) => str.split("")
const empty = arrayFromString("")
const oneChar = arrayFromString("g")
const odd = {
     from: arrayFromString("abcde"),
     to: arrayFromString("edcba")
}
const even = {
     from: arrayFromString("abcdef"),
     to: arrayFromString("fedcba")
}

describe('Test String Reverse', () => {
     it('Empty String', () => {
          expect(reverseString(empty)).toEqual(empty)
     })

     it('One Character String', () => {
          expect(reverseString(oneChar)).toEqual(oneChar)
     })

     it('Odd number of characters', () => {
          expect(reverseString(odd.from)).toEqual(odd.to)
     })
     it('Even number of characters', () => {
          expect(reverseString(even.from)).toEqual(even.to)
     })
})

