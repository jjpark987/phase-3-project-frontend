export const convertTimestamp = (timestamp) => {
    if (timestamp) {
        const date = timestamp.split('T')[0].split('-')
        return `${date[1]}/${date[2]}/${date[0]}`
    }
}
