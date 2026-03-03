<template>
  <div class="home">
    <h1>Welcome to the Vue CMS</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  setup() {
    const posts = ref([]);

    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts');
        posts.value = res.data;
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(fetchPosts);

    return { posts };
  }
});
</script>

<style scoped>
.home {
  padding: 2rem;
}
</style>
