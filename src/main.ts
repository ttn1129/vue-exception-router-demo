import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store/store'
import ErrorHandler from '@/errors/error-handler'

Vue.config.productionTip = false;

Vue.config.errorHandler = (err:Error, vm, info) => {
  const pathOnError:string|null = ErrorHandler.handleAndGetPathOnError(err);
  if(pathOnError)
  {
    store.commit('setRedirecting', true);
    router.push(pathOnError);
  }
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
