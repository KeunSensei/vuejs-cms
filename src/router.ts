import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Admin from './views/Admin.vue';
import EditPost from './views/EditPost.vue';
import CreatePost from './views/CreatePost.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/admin', name: 'Admin', component: Admin },
  { path: '/admin/create', name: 'CreatePost', component: CreatePost },
  { path: '/admin/edit/:id', name: 'EditPost', component: EditPost, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
