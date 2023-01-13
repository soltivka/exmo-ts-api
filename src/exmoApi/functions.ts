import * as CryptoJS from "crypto-js";
import {Credentials} from "../types/types";

export const sign = function (message: string, credentials: Credentials) {
  if (!credentials) {
    throw new Error('You must set Credentials first')
  }
  return CryptoJS.HmacSHA512(message, credentials.secretKey).toString(CryptoJS.enc.Hex);
}