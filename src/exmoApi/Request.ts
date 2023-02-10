export type  RequestCapsule = <T>() => Promise<T>


export class Request {
  private _requests: Array<() => Promise<any>> = []
  private isRuning: boolean = false
  private addToQueue = (capsule: RequestCapsule): Promise<unknown> => {
    return new Promise((resolve) => {
      const toCallFunction = async () => {
        const result = await capsule()
        resolve(result)
      }
      this._requests.push(toCallFunction)
    })
  }

  constructor() {

  }
  runQueue = () => {
    if (this.isRuning) {
      //immediate cancel if another runing in process
      return
    }
    this.isRuning = true
    const capsule = this._requests.shift()
    if(capsule){
      capsule().then(()=>{
        this.isRuning=false
        this.runQueue()
      })
    }else{
      this.isRuning=false
    }
  }
  init = async (capsule: RequestCapsule) => {
    const returnPromise = this.addToQueue(capsule)
    if(!this.isRuning){this.runQueue()}
    return returnPromise
  }
}

export default Request
