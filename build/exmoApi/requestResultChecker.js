"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkResult = void 0;
/** parameter : exmo_request_result. Throws error if result has result:false*/
const checkResult = function (data, info) {
    if (!data.result && data.error.indexOf('nonce parameter') !== -1) {
        throw new Error(JSON.stringify(data));
    }
};
exports.checkResult = checkResult;
