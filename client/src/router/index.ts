import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CaseDetail from '../views/CaseDetail.vue'
import DocumentDemo from '../views/DocumentDemo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/case/:caseNumber',
      name: 'CaseDetail',
      component: CaseDetail,
      props: true
    },
    {
      // 通用文档页面路由
      path: '/case/:caseNumber/document/:documentType',
      name: 'DocumentDetail',
      component: DocumentDemo,
      props: true
    }
  ]
})

export default router