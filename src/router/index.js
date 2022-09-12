import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '../views/Main.vue'
import Home from '../views/Home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/User/User.vue')
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import('../views/Mall/Mall.vue')
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('../views/Other/PageOne.vue')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('../views/Other/PageTwo.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
