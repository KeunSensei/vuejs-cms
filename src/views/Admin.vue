<template>
  <div class="admin">
    <h1>Admin Panel</h1>
    <router-link to="/admin/create">Create New Post</router-link>
    <button @click="logout" style="margin-left:1rem">Logout</button>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <button @click="edit(post.id)">Edit</button>
        <button @click="remove(post.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  setup() {
    const posts = ref<any[]>([]);
    const router = useRouter();

    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts');
        posts.value = res.data;
      } catch (err) {
        console.error(err);
      }
    };

    const edit = (id: string) => {
      router.push({ name: 'EditPost', params: { id } });
    };

    const remove = async (id: string) => {
      try {
        await axios.delete(`/api/posts/${id}`);
        fetchPosts();
      } catch (err) {
        console.error(err);
      }
    };

    const logout = () => {
      localStorage.removeItem('token');
      delete (axios.defaults.headers.common as any)['Authorization'];
      router.push({ name: 'Login' });
    };

    onMounted(fetchPosts);
    return { posts, edit, remove, logout };
  }
});
</script>

<style scoped>
.admin {
  padding: 2rem;
}
</style>
