import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Meetups from '@/components/meetup/Meetups'
import CreateMeetup from "@/components/meetup/CreateMeetup";
import Profile from "@/components/user/Profile";
import SignIn from "@/components/user/SignIn";
import SignUp from "@/components/user/SignUp";
import Meetup from "@/components/meetup/Meetup";
import AuthGuard from "@/router/auth-guard"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/meetups',
    name: 'meetups',
    component: Meetups
  },
  {
    path:'/meetup/:id',
    name:'meetup',
    props:true,
    component: Meetup,
    beforeEnter: AuthGuard

  },
  {
    path: '/newmeetup',
    name: 'CreateMeetup',
    component: CreateMeetup
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUp,

  },
  {
    path: '/',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
