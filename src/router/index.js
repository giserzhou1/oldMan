import Vue from 'vue'
import VueRouter from 'vue-router'
// import login from '@/login/login'
import regist from '@/login/regist'
import map from '@/map/location'
import number from '@/number/number'
import home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'login',
  //   component: login
  // },
  {
    path: '/',
    name: 'home',
    component: home,
    children: [
      {
        path: '/map',
        name: 'map',
        component: map
      },
      {
        path: '/number',
        name: 'number',
        component: number
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  },
  {
    path: '/regist',
    name: 'regist',
    component: regist
  }
]

const router = new VueRouter({
  routes
})

export default router
