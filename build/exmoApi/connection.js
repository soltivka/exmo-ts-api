"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const exmo_api_1 = require("./exmo_api");
function connect(credentials) {
    return new exmo_api_1.ExmoApi(credentials);
}
exports.connect = connect;
