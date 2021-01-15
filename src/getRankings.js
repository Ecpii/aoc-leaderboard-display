// generate a new array with the number of elements an index is greater than (or less than, with isInverted)
// in the old array.
// for example, [5, 2, 3, 1, 4] would return [4, 1, 2, 0, 3]
function getRankings(array, isInverted) {
    return array.map(element =>
        array.reduce((numBetter, otherElement) => {
            if ((!isInverted && element > otherElement)
                || (isInverted && element < otherElement)) {
                return numBetter + 1
            }
            return numBetter
        }, 0)
    )
}

export default getRankings;
