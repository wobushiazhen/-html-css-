import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'

import layout from '@/views/layout/index.vue'
//菜单路由
export const routerList = [
  {
    path: '/',
    name: 'home',
    label: '首页',
    component: layout,
    // redirect:'/user/list',
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
    name: 'user',
    label: '用户管理',
    component: layout,
    children: [
      {
        path: 'list',
        name: 'user-list',
        label: '用户列表',
        component: () => import('@/views/user/index.vue')
      }
    ]
  },
  // 权限管理
  {
    path: '/permissions',
    name: 'permissions',
    label: '权限管理',
    component: layout,
    children: [
      //角色权限
      {
        path: 'role',
        name: 'permissions-role',
        label: '角色权限',
        component: () => import('@/views/permissions/role.vue')
      },
      //权限列表
      {
        path: 'list',
        name: 'permissions-list',
        label: '权限列表',
        component: () => import('@/views/permissions/list.vue')
      },
    ]
  },
  // 订单管理
  {
    path: '/order',
    name: 'order',
    label: '订单管理',
    component: layout,
    children: [
      {
        path: 'list',
        name: 'order-list',
        label: '订单列表',
        component: () => import('@/views/order/list.vue')
      },
    ]
  },
  // 商品管理
  {
    path: '/goods',
    name: 'goods',
    label: '商品管理',
    component: layout,
    children: [
      //商品列表
      {
        path: 'list',
        name: 'good-list',
        label: '商品列表',
        component: () => import('@/views/goods/list.vue')
      },
      // 商品添加
      {
        path: 'add',
        name: 'good-add',
        label: '商品添加',
        component: () => import('@/views/goods/add.vue'),
        children: [
          {
            path: 'add-1',
            name: 'add-1',
            label: '商品列表-1',
          }
        ]
      },
      //商品分类
      {
        path: 'categoreis', 
        name: 'categoreis',
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

export default router
