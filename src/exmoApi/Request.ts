import dotenv from 'dotenv'
import {checkResult} from "./requestResultChecker";

export type  RequestCapsule = <T>() => Promise<T>


export class Request {
  private _requests: Array<() => Promise<any>> = []
  private isRuning: boolean = false
  public timeout = 10
  // todo check for function return type
  private addToQueue = (capsule: RequestCapsule): any => {
    return new Promise((resolve) => {
      const toCallFunction = async () => {
        const result = await capsule()
        checkResult(result)
        resolve(result)
      }
      this._requests.push(toCallFunction)
    })
  }

  constructor() {

  }

  setTimeout = (timeout: number = 10) => {
    this.timeout = timeout
  }

  runQueue = () => {
    if (this.isRuning) {
      //immediate cancel if another runing in process
      return
    }
    this.isRuning = true
    setTimeout(()=>{
      const capsule = this._requests.shift()
      if(capsule){
        capsule()
        this.isRuning=false
        this.runQueue()
      }else{
        this.isRuning=false
      }
    }, this.timeout)
  }

  init = async (capsule: RequestCapsule) => {
    this.addToQueue(capsule)
    if(!this.isRuning){this.runQueue()}
  }
}

export default Request
