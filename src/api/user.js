import request from "../utils";

export function getUserList(){
    return request({
        method:"GET",
        url:'/user'
    })
}

export function getSearchUserList(adminName){
    return request({
        method:"GET",
        url:`/user?adminName_li
        ke=${adminName}`
    })
}

export function delUserList(id){
    return request({
        method:"DELETE",
        url:`/user/${id}`,
    })
}

export function addUserList(params){
    return request({
        method:"POST",
        url:`/user`,
        data:params
    })
}

export function editUserList(id,params){
    return request({
        method:'PATCH',
        url:`user/${id}`,
        data:params
    })
}
