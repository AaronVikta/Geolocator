import { createRouter, createWebHistory } from 'vue-router'
import Render from './components/Render.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Render,
    },
    {
      path: '/find',
      component: () => import('./components/IPLookup.vue'),
    },

  ],
})
