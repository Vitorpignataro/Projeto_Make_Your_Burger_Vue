import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

//Definindo as rotas da nossa aplicação
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    // Definindo path, nome e onde é importado
    path: '/pedidos',
    name: 'Pedidos',
    component: () => import('../views/Pedidos.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
