import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DeviceRegistration from '@/views/DeviceRegistration.vue'
import DeviceListView from '@/views/DeviceListView.vue'
import DeviceDetailView from '../views/DeviceDetailView.vue'
import Monitoring from '@/views/Monitoring.vue'
import Dashboard from '@/views/Dashboard.vue'
import SituationAlertDashboard from '@/views/SituationAlertDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },

  {
    path: '/register-device',
    name: 'device-registration',
    component: DeviceRegistration,
  },

  {
    path: '/device-list',
    name: 'device-list',
    component: DeviceListView,
  },

  {
    path: '/device/:macAddress',
    name: 'device-detail',
    component: DeviceDetailView,
    props: true,
  },

  {
    path: '/monitoring',
    name: 'monitoring',
    component: Monitoring,
  },

  {
    path: '/dashboard/:macAddress',
    name: 'dashboard',
    component: Dashboard,
    props: true,
  },

  {
    path: '/alerts',
    name: 'situation-alerts',
    component: SituationAlertDashboard,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
