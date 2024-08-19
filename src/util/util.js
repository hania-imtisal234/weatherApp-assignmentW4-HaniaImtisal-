export const debounce = (callback, waitTime) => {
    let timer;
    const debounced = (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args);
        }, waitTime);
    };
    debounced.cancel = () => {
        clearTimeout(timer);
    };

    return debounced;
};
