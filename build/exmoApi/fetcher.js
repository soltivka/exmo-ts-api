"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const requestResultChecker_1 = require("./requestResultChecker");
const queue = [];
const request = function (callback) {
    return new Promise((resolve) => {
        const toCallFunction = async () => {
            const result = await callback();
            (0, requestResultChecker_1.checkResult)(result);
            resolve(result);
        };
        queue.push(toCallFunction);
    });
};
exports.request = request;
const fetcher = function () {
    setTimeout(() => {
        if (queue.length > 0) {
            console.log(new Date().toLocaleTimeString() + ". Requests in queue = " + queue.length);
        }
        const request = queue.shift();
        if (!request) {
            fetcher();
            return;
        }
        request().then(() => {
            fetcher();
        });
    }, 10);
};
fetcher();
