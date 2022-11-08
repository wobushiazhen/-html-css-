import { defineStore } from 'pinia'
import { routerList } from '@/router/index.js'
export const useRouterListStore = defineStore('routes',  {   
  state:()=>({
    routerList,
  })
})
