<template>
  <div id="app" :key='reloadKey'>
    <ApplicationMessage
     v-if="show"
     :message="getApplicationMessage()"
    ></ApplicationMessage>
      {{ this.username }}
    <div class="links">
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/">Login</router-link>
      <router-link to="/ServerError">ServerError</router-link>
    </div>
    <img alt="Vue logo" src="./assets/logo.png">
     <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

// Hook しないと使えない
// Component.registerHooks([
//   'beforeRouteLeave'
// ])
// import {Module} from 'vuex'
// import ProfileState from '@/store/states/profile-state'
import { State, Action, Getter } from 'vuex-class';
// import { Profile } from './store/profile';
// import RootState from './store/states/root-state';

import UserInterface from '@/models/user';
// import { Route } from 'vue-router';
import VueRouter from "vue-router";
import ApplicationMessage from '@/components/ApplicationMessage.vue';

@Component({
  components:{
    ApplicationMessage
  },
})
export default class App extends Vue {
  // beforeRouteLeave(to:VueRouter, from:VueRouter, next:any){
  //   // このコンポーネントを描画するルートが変更されたときに呼び出されますが、
  //   // このコンポーネントは新しいルートで再利用されます。
  //   // たとえば、動的な引数 `/foo/:id` を持つルートの場合、`/foo/1` と `/foo/2` の間を移動すると、
  //   // 同じ `Foo` コンポーネントインスタンスが再利用され、そのときにこのフックが呼び出されます。
  //   // `this` でコンポーネントインスタンスにアクセスできます。
    // const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    // if (answer) {
    //   next()
    // } else {
    //   next(false)
    // }
    // this.getApplicationMessage;
  // }

  // private popApplicationMessage():string{
  //   this.message = this.getApplicationMessage;
  //   // this.$store.commit('setApplicationMessage','')
  //   return this.message;
  // }
  private get user():UserInterface{
    return this.$store.state.Profile.user;
  }
  // @Getter('existApplicationMessage') existApplicationMessage!:boolean;
  // @Getter('isApplicationMessageChanged') isApplicationMessageChanged!:boolean;
  @Getter('getApplicationMessage') applicationMessage!:string;
  @Getter('getReloadKey') reloadKey!:number;
  private username:string = this.user.name;
  // private reloading:boolean = false;
  private getApplicationMessage():string
  {
    return this.applicationMessage;
  }
  mounted():void {
    this.$store.subscribe((mutation, state) => {
      switch(mutation.type) {
        case 'setApplicationMessage':
          this.show = false;
          const newValue = mutation.payload; 
          if(newValue === '')
          {
            this.$store.commit('reload');
            return;
          }
          this.show = true;
          this.$store.commit('reload');
          this.$store.commit('setRedirecting',false)
          break;
      }
    });
    // this.$store.watch(
    //   (state, getters)=> getters.getApplicationMessage,
    //   (newValue, oldValue) => {
    //     console.log('watch work->newValue:' + newValue+ ', oldValue:'+oldValue)
    //     if(newValue === ''
    //      || newValue === oldValue)
    //     {
    //       this.show = false;
    //       this.$store.commit('reload');
    //       return;
    //     }
    //     if(newValue !== '')
    //     {
    //       this.show = true;
    //       this.$store.commit('reload');
    //       return;
    //     }
    //     this.show = false;
    // });
  }
  private show:boolean= false;

  // private shows():boolean {
  //   console.log('this.applicationMessage:' + this.applicationMessage)
  //   const message = this.$store.getters.getApplicationMessage;
  //   console.log('const message:' + message)
  //   if(this.applicationMessage === message
  //     && message !== '')
  //   {
  //     if(!this.reloading)
  //     {
  //       this.reloading = true;
  //             }
  //     return true
  //   }
  //   if(this.applicationMessage !== message
  //     && message === '')
  //   {
  //     return false
  //   }
  //   return this.existApplicationMessage;
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.links *{
  padding: 0.5rem;
}
</style>
