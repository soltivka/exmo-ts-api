import {checkResult} from "./requestResultChecker";

const queue:{(): Promise<void>}[] = [];

export const request = function <T>(callback: () => Promise<T>):Promise<T> {
    return new Promise((resolve) => {
        const toCallFunction = async () => {
            const result = await callback()
            checkResult(result)
            resolve(result)
        }
        queue.push(toCallFunction);
    })
};
const fetcher = function () {
    setTimeout(() => {
        if (queue.length > 0) {
            console.log(new Date().toLocaleTimeString()+". Requests in queue = " + queue.length)
        }
        const request = queue.shift()
        if (!request) {
            fetcher()
            return
        }
        request().then(() => {
            fetcher()
        })
    }, 10)
}
fetcher();