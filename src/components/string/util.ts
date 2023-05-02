export const reverseString = (state: Array<string>, idx?: number): Array<string> => {
    const len = state.length
    idx = idx || 0

    if (idx < (len / 2 )) {
        const ret = [state[len - idx - 1]]
        ret.push(...reverseString(state, idx + 1))
        if (idx <= len/2 -1) ret.push(state[idx])
        return ret
    }
    else return []
}