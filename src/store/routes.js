import { defineStore } from 'pinia'
import { routerList } from '@/router/index.js'
export const useRouterListStore = defineStore('routes',  {   
  state:()=>({
    routerList,
    // 是否展开左菜单
    isOpen:false
  }),
  getters:{
    getRoutes(){
      return routerList.filter((item)=>{
        return !item.hiddent
      })
    }
  }
})
