import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Admin from './views/Admin.vue';
import EditPost from './views/EditPost.vue';
import CreatePost from './views/CreatePost.vue';
import Login from './views/Login.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/admin', name: 'Admin', component: Admin },
  { path: '/admin/create', name: 'CreatePost', component: CreatePost },
  { path: '/admin/edit/:id', name: 'EditPost', component: EditPost, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  if (to.path.startsWith('/admin')) {
    const token = localStorage.getItem('token');
    if (!token) return { name: 'Login' };
  }
});

export default router;
