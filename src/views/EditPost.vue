<template>
  <div class="edit-post" v-if="loaded">
    <h1>Edit Post</h1>
    <form @submit.prevent="submit">
      <div>
        <label>Title</label>
        <input v-model="title" />
      </div>
      <div>
        <label>Content</label>
        <textarea v-model="content"></textarea>
      </div>
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    const title = ref('');
    const content = ref('');
    const loaded = ref(false);

    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${route.params.id}`);
        title.value = res.data.title;
        content.value = res.data.content;
        loaded.value = true;
      } catch (err) {
        console.error(err);
      }
    };

    const submit = async () => {
      try {
        await axios.put(`/api/posts/${route.params.id}`, { title: title.value, content: content.value });
        router.push({ name: 'Admin' });
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(fetchPost);

    return { title, content, submit, loaded };
  }
});
</script>

<style scoped>
.edit-post {
  padding: 2rem;
}
</style>
