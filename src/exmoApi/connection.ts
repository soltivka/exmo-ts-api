import {ExmoApi} from "./exmo_api";
import {Credentials} from "../types/types";


export function connect() {
    return new ExmoApi()
}