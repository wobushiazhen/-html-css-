import request from "../utils";

export function upLoad(params){
    return request({
        method:"POST",
        url:'upload',
        data:params
    })
}

export function getUpLoad(){
    return request({
        method:"GET",
        url:"upload"
    })
}