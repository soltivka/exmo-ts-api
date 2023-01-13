/** parameter : exmo_request_result. Throws error if result has result:false*/
export const checkResult = function(data:any,info?:any){
    if(!data.result&&data.error.indexOf('nonce parameter')!==-1){
        throw new Error(JSON.stringify(data))
    }
}
