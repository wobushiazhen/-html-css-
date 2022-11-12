import request from "../utils";

export function getGoods(){
    return request({
        method:"GET",
        url:'/goods'
    })
}
export function getSearchGoodsList(title){
    return request({
        method:"GET",
        url:`/goods?title_like=${title}`
    })
}

export function getCategoreGoodsList(title){
    return request({
        method:"GET",
        url:`/goods?categore=${title}`
    })
}

export function addGoods(params){
    console.log(params);
    return request({
        method:"POST",
        url:'/goods',
        data:params
    })
}

export function delGood(id){
    console.log(id);
    return request({
        method:"DELETE",
        url:`/goods/${id}`,
    })
}
