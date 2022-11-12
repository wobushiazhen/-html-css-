import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import layout from '@/views/layout/index.vue'
//菜单路由
export const routerList = [
  {
    path: '/',
    name: 'home',
    label: '首页',
    component:layout,
    redirect:'/home/tu',
  },
  {
    path:'/home',
    name:'首页',
    label:'图标',
    hiddent:true,
    component:layout,
    children:[
     { 
      path:'tu',
       name:"图表",
       component: ()=>import('@/views/home/index.vue'),}
    ]
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    hiddent: true,
    component: () => import('@/views/login/index.vue')
  },
  //用户管理
  {
    path: '/user',
    name: '用户管理',
    label: '用户管理',
    component: layout,
    children: [
      {
        path: 'list',
        name: '用户列表',
        label: '用户列表',
        component: () => import('@/views/user/index.vue')
      }
    ]
  },
  // 权限管理
  {
    path: '/permissions',
    name: '权限管理',
    label: '权限管理',
    component: layout,
    children: [
      //角色权限
      {
        path: 'role',
        name: '角色权限',
        label: '角色权限',
        component: () => import('@/views/permissions/role.vue')
      },
      //权限列表
      {
        path: 'list',
        name: '权限列表',
        label: '权限列表',
        component: () => import('@/views/permissions/list.vue')
      },
    ]
  },
  // 订单管理
  {
    path: '/order',
    name: '订单管理',
    label: '订单管理',
    component: layout,
    children: [
      {
        path: 'list',
        name: '订单列表',
        label: '订单列表',
        component: () => import('@/views/order/list.vue')
      },
    ]
  },
  // 商品管理
  {
    path: '/goods',
    name: '商品管理',
    label: '商品管理',
    component: layout,
    children: [
      //商品列表
      {
        path: 'list',
        name: '商品列表',
        label: '商品列表',
        component: () => import('@/views/goods/list.vue')
      },
      // 商品添加
      {
        path: 'add',
        name: '商品添加',
        label: '商品添加',
        component: () => import('@/views/goods/add.vue'),
        // children: [
        //   {
        //     path: 'add-1',
        //     name: 'add-1',
        //     label: '商品列表-1',
        //   }
        // ]
      },
      //商品分类
      {
        path: 'categoreis', 
        name: '商品分类',
        label: '商品分类',
        component:()=>import('@/views/goods/categore.vue')
      }
    ]
  },
  // 类别管理
  // {
  //   path:'categoreis',
  //   name:'categoreis'
  // }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  //登录页，首页不在菜单显示
  routes: routerList
})

router.beforeEach((to,from,next)=>{
  NProgress.start();
  next();
})

router.afterEach(()=>{
  NProgress.done();
})
export default router
