import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import addsub from '@/components/addsub'
import adduser from '@/components/adduser'
import addbook from '@/components/addbook'
import file from '@/components/addfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/addsub',
      name: 'addsub',
      component: addsub
    },
    {
      path: '/adduser',
      name: 'adduser',
      component: adduser
    },
    {
      path: '/addbook',
      name: 'addbook',
      component: addbook
    },
    {
      path: '/file',
      name: 'file',
      component: file
    }
  ]
})
