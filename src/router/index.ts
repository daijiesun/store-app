import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/pages/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: "/goods"
  },
  {
    path: '/goods',
    name: 'Goods',
    component: () => import(/* webpackChunkName: "List" */ '@/pages/goods/List.vue')
  },
  {
    path: '/goods/detail',
    name: 'GoodsDetail',
    props: route => ({ id: route.query.id }),
    component: () => import(/* webpackChunkName: "GoodsDetail" */ '@/pages/goods/Detail.vue')
  }
]

const hash: boolean = false;
const baseUrl:string = process.env.NODE_ENV === "production" ? "/store-app/" : "";
const router = createRouter({
  history: hash ? createWebHashHistory() : createWebHistory(baseUrl),
  routes
})

export default router
