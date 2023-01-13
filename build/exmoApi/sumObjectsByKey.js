"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumObjectsByKey = void 0;
const sumObjectsByKey = (...rest) => rest.reduce((result, current) => {
    for (let key in current) {
        let value = Number(current[key]);
        if (result[key] === undefined) {
            result[key] = value;
        }
        else {
            result[key] += value;
        }
    }
    return result;
}, {});
exports.sumObjectsByKey = sumObjectsByKey;
