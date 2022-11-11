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
