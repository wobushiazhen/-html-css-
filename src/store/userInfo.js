
import { defineStore } from 'pinia'
export const useUserInfoStore=defineStore('userInfo',{
    state:()=>{
        return{
            adminName:'',
        }
    },
})
