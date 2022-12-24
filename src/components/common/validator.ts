export const validateRequired = (value: string) => {
    let error;
    if (!value) {
        return error = 'Поле обязательно';
    }
    return error
}