import { createRouter, createWebHashHistory } from 'vue-router'
import Wall from '../views/Wall.vue'

const routes = [
  {
    path: '/',
    name: 'Wall',
    component: Wall,
    meta: {
      title: "Groupomania",
      icon:"/icon.png" 
    }
   }
  ,
  {
    path: '/login',
    name: 'Login',
     component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
     component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
  {
    path: '/louis',
    name: 'Louis',
     component: () => import(/* webpackChunkName: "louis" */ '../views/Louis.vue')
  },
  {
    path: '/posts/:id',
    name: 'OnePost',
    component: () => import(/* webpackChunkName: "louis" */ '../views/OnePost.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
