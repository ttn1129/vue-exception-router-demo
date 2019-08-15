import {Module, Action} from 'vuex';
import UserInterface from '@/models/user'
import axios from 'axios'
import ProfileState from './states/profile-state'
import RootState from './states/root-state'

export const Profile:Module<ProfileState,RootState> = {
    state: {
        user: {
            email:'',
            name:'guest'
        },
        authenticated:false
    },
    mutations:{
        profileLoaded(state, payload: UserInterface) {
            state.authenticated = true;
            state.user = payload;
        },
        profileError(state) {
            state.authenticated = false;
            state.user = undefined;
        }
    },
    actions:{
        fetchData({ commit }): any {
            axios({
                url: 'https://....'
            }).then((response) => {
                const payload: UserInterface = response && response.data;
                commit('profileLoaded', payload);
            }, (error) => {
                console.log(error);
                commit('profileError');
            });
        }
    }
    // - ハンドラーがエラーの種類によって描画を行う。
    // - ApplicationError なら画面のコンポーネント「ErrorMessage」にエラーメッセージを表示する。
    // - 認証エラーならログイン画面に遷移する。
    // - サーバーエラー（サーバーから500のレスポンスを受け取った場合とする。）は、500エラー画面に遷移する。

}

