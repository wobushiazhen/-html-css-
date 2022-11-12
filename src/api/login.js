import request from "../utils"

export function login(params) {
    return request({
        method: 'GET',
        url: `user?adminName=${params.adminName}&password=${params.password}`,
        data:params
    })
}