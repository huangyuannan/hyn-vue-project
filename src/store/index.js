import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : {},
    isLogin : false,
  },
  mutations: {
    setUser : (state,user)=>{
      if(user.id !== '' && user.id !== undefined && user.id !== null ){
        state.isLogin = true;
      }else{
        state.isLogin = false;
      }
      state.user = user; 
    }
  },
  actions: {
    
  },
  modules: {

  }
})
