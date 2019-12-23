import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
const index = resolve => require(['../components/index'],resolve);
const testIndex = resolve => require(['../components/test/test-index'],resolve)
// const index = ()=> import('../components/index');
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path : '/index',
      name : 'index',
      component : index
    },
    {
      path : '/test/index',
      name : 'test-index',
      component : testIndex
    }
  ]
})
