import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../views/ProductView.vue')
  },
  {
    path: '/product/:barcode/:laoname',
    name: 'Barcode',
    component: () => import('../views/BarcodeGen.vue'),
  },
  {
    path: '/product/:barcode/:price',
    name: 'codePrice',
    component: () => import('../views/BarcodePrice.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


export default router
