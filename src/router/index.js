import Vue from 'vue'
import VueRouter from 'vue-router'
import NoteIndex from '../views/NoteIndex'
import NoteDetail from '../views/NoteDetail'
import BeforeLogin from '../views/BeforeLogin'
import NoteIndexOffline from '../views/NoteIndexOffline'
import Search from '../views/SearchDetail'
import Profile from '../views/Profile'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // component: Home
    redirect: '/login'
  },
  {
    path: '/login',
    component: BeforeLogin
  },
  {
    path: '/noteIndex',
    name: 'noteIndex',
    component: NoteIndex
    // component: NoteDetail
  },
  {
    path: '/noteIndex-offline-mod',
    name: 'noteIndexOffline',
    component: NoteIndexOffline
    // component: NoteDetail
  },
  {
    path: '/noteDetail/:noteCode',
    name: 'noteDetail',
    // component: NoteIndex
    component: NoteDetail
  },
  {
    path: '/search/:searchData',
    name: 'searchDetail',
    component: Search
  },
  {
    path: '/profile/:userId',
    name: 'profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
