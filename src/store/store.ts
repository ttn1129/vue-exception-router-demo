import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { Profile } from './profile';
import RootState from './states/root-state';

Vue.use(Vuex);

const store:StoreOptions<RootState> = {
    state:{
        __applicationMessage__:'',
        __previousApplicationMessage__:'',
        __redirecting__: false,
        __reloadKey__: 0
    },
    getters:{
        getReloadKey(state:RootState):number
        {
            return state.__reloadKey__;
        },
        isApplicationMessageChanged(state:RootState):boolean
        {
            return state.__applicationMessage__ === state.__applicationMessage__;
        },
        existApplicationMessage(state:RootState):boolean
        {
            return state.__applicationMessage__.length > 0
                    && state.__redirecting__;
        },
        redirecting(state:RootState):boolean{
            return state.__redirecting__;
        },
        getApplicationMessage(state:RootState):string {
            const messsage = state.__applicationMessage__;
            return messsage;
        },
    },
    mutations:{
        setApplicationMessage(state:RootState,message:string)
        {
            console.log('state.__applicationMessage__ is ' + state.__applicationMessage__);
            console.log('Application message will be set->' + message);
            state.__previousApplicationMessage__ = state.__applicationMessage__;
            state.__applicationMessage__ = message;
            console.log('state.__applicationMessage__ is ' + state.__applicationMessage__);
        },
        setRedirecting(state:RootState,occuring:boolean):void 
        {
            state.__redirecting__ = occuring;
        },
        reload(state:RootState)
        {
            state.__reloadKey__++;
            console.log('state.__reloadKey__ is ' + state.__reloadKey__);
        }
    },
    modules: {
        Profile
    }
};

export default new Vuex.Store<RootState>(store);