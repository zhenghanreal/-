import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from 'js-cookie'
Vue.use(VueRouter)
import Main from '../pages/Main.vue'
import Home from '../pages/Home.vue'
import User from '../pages/User.vue'
import Mall from '../pages/Mall.vue'
import PageOne from '../pages/PageOne.vue'
import PageTwo from '../pages/PageTwo.vue'
import Login from '../pages/Login.vue'
const router =  new VueRouter({
    routes: [
        {
            path: '/',
            component: Main,
            name:'Main',
            redirect: 'home',
            children: [
                // { path: 'home', component: Home,name:'home' },
                // { path: 'user', component: User,name:'user' },
                // { path: 'mall', component: Mall,name:'mall' },
                // { path: 'page1', component: PageOne,name:'page1' },
                // { path: 'page2', component: PageTwo ,name:'page2'},
            ]
        },
        {
            path:'/login',
            component:Login,
            name:'login'
        }
    ]
})

router.beforeEach((to, from, next)=>{
    const token = Cookie.get('token')
    if(!token && to.name !== 'login'){
        next({name:'login'})
    }else if(token && to.name ==='login'){
        next({name:'home'})
    }else{
        next()
    }
})

export default router