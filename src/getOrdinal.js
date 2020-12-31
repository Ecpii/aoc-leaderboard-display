export default function getOrdinal(num) {
    switch (num % 10) {
        case 1:
            if (num < 10 || Math.floor(num / 10) !== 1) {
                return 'st'
            } else {
                return 'th'
            }
        case 2:
            if (num < 10 || Math.floor(num / 10) !== 1) {
                return 'nd'
            } else {
                return 'th'
            }
        case 3:
            if (num < 10 || Math.floor(num / 10) !== 1) {
                return 'rd'
            } else {
                return 'th'
            }
        default:
            return 'th'
    }
}
