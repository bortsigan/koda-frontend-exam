export function errorMessage(error) {
    const errors = Object.values(error.data?.errors || {}).flat()
    return errors.length 
            ? errors.join(' ') 
            : error.data?.message || error.message || 'Unable to reach the backend.'
}