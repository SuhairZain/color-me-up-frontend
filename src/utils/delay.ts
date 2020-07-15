export const delay = (delayInMs: number) => {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, delayInMs);
    });
};
