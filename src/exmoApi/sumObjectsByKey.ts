export const sumObjectsByKey = (...rest:any) => rest.reduce( ( result:any, current:any ) => {
    for(let key in current){
        let value:number = Number(current[key]);
        if(result[key] === undefined){
            result[key] = value;
        }else{
            result[key] += value;
        }
    }
    return result;
}, {} );