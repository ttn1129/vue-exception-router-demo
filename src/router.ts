import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import {Profile} from '@/store/profile';
import store from '@/store/store';
import ProfileState from '@/store/states/profile-state';
import AuthorizationError from '@/errors/AuthorizationError';
import ServerError from '@/views/ServerError.vue';
import ErrorHandler from '@/errors/error-handler';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    {
      path: '/ServerError',
      component: ServerError
    },
];

const router:VueRouter = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next)=>{
    const redirecting:boolean = store.getters.redirecting;
    console.log('redirecting:'+redirecting)
    redirecting 
        ? store.commit('setRedirecting',false)
        : store.commit('setApplicationMessage','');
            
    try
    {
        if(to.matched.some(record => record.meta.requiresAuth)
        && ! (((Profile.state) as ProfileState).authenticated)) {
            console.log('認証が必要です');
            throw new AuthorizationError('認証が必要です');
        }
        if(redirecting)
        {
            next();
            return;
        }
        store.commit('reload');
        next();
    }
    catch(error)
    {
        next('__nowhere__')
        const path = ErrorHandler.handleAndGetPathOnError(error);
        store.commit('setRedirecting', true);
        
        path ? next(path)
             : next();
    } 
});


export default router;