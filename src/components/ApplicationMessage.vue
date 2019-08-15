<template>
    <div class="application__message">
        {{ message }}        
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { State, Action, Getter } from 'vuex-class';
import Component from 'vue-class-component'

@Component({
  props: {
    message: String
  }
})
export default class ApplicationMessage extends Vue {
}
</script>

<style>
    .application__message{
        position: fixed;
        top: 20px;
        margin-left: 20%;
        margin-right: 20%;
        color: crimson;
        -webkit-animation: fade-in-out 1s ease 0s forwards;
        animation: fade-in-out 1s ease 0s forwards;
        visibility: hidden;
        z-index: 1;
    }
    @-webkit-keyframes fade-in-out {
      0% {
          visibility: hidden;
          transform: translate(0,-10px);
          opacity: 0;
      }
      100% {
          visibility: visible;
          transform: translate(0,0);
          opacity: 1;
      }
      /* 100% {
          visibility: hidden;
          opacity: 0;
      } */
    }
    @keyframes fade-in-out {
      0% {
          visibility: hidden;
          transform: translate(0,-10px);
          opacity: 0;
      }
      100% {
          visibility: visible;
          transform: translate(0,0);
          opacity: 1;
      }
      /* 100% {
          visibility: hidden;
          opacity: 0;
      } */
    }

</style>