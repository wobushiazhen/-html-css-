

// 要做持久化存储
import { defineStore } from 'pinia'
export const useUserInfoStore=defineStore('userInfo',{
    state:()=>{
        return{
            adminName:'',
        }
    },
})
