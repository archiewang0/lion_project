
// import {defineAsyncComponent} from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

// import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
// import UserAuth from './pages/auth/UserAuth.vue';

import store from './store/index';


const CoachDetail = ()=> import('./pages/coaches/CoachDetail.vue')
const CoachRegistration = ()=>{return import('./pages/coaches/CoachRegistration.vue')}
const ContactCoach = ()=> import('./pages/requests/ContactCoach.vue')
const RequestsReceived = ()=>{return import('./pages/requests/RequestsReceived.vue')}
const UserAuth = ()=> {return import('./pages/auth/UserAuth.vue')}


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: ()=> CoachDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach} // /coaches/c1/contact
      ]
    },
    { path: '/register', component: CoachRegistration , meta:{requiresAuth: true}},
    { path: '/requests', RequestsReceived ,meta:{requiresAuth: true} },
    { path: '/auth' ,UserAuth ,meta:{requiresUnauth: true}},
    { path: '/:notFound(.*)', component: NotFound }
  ]
});


// 使用這確保使用者 甚至自己輸入內容也不會到達使用者自己想要到達的內容
router.beforeEach(function(to,_,next){
  // console.log('檢查是否登入'+store.getters.isAuthenticated)

  // 在register 與 requests 頁面上 當未登入時 會前往auth
  if(to.meta.requiresAuth && !store.getters.isAuthenticated){
    next('/auth')
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated){
    // console.log(store.getters.isAuthenticated)
    next('/coaches')
  } else{
    next()
  }
})

export default router;
