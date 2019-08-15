<template>
    <div>
        <h2>Login</h2>
        <form v-on:submit.prevent action="" method="post">
            <p>Email<input v-model="credintials.email" type="text" name="email" id="email"></p>
            <p>Password<input v-model="credintials.password" type="password" name="password" id="password"></p>
            <button @click="login" type="submit">login</button>
        </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import credintials from "./../models/credintials"
export default Vue.extend({
    data():{
        credintials:credintials
    }{
        return {
            credintials: {
                email:"",
                password:"",
            }
        }
    },
    methods:{
        /**
         * * credintialsに入力の漏れがある場合はValidationErrorをthrowする
         * * 認証情報からサーバーにユーザーの問い合わせを行う。
         * * 成功時はVuexのユーザー情報を登録しダッシュボードに遷移する
         * * 失敗時は認証エラーインスタンスを生成しVuexのエラーハンドラ処理を実行する
         */ 
        login():void {
            if ( this.credintials.email.length === 0
                || this.credintials.password.length === 0 )
            {
                
            }
            // catch して Vuexのエラーハンドラ処理を実行する
        },
        whenLoginSuccess():void {

        },        
        whenLoginFail():void {
        }

    }
})
</script>