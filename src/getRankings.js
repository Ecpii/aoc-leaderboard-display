function getRankings(array, inverted) {
    return array.map(element =>
        array.reduce((numBetter, otherElement) => {
            if ((!inverted && element > otherElement)
                || (inverted && element < otherElement)) {
                return numBetter + 1
            }
            return numBetter
        }, 0)
    )
}

export default getRankings;
