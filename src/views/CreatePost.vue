<template>
  <div class="create-post">
    <h1>Create Post</h1>
    <form @submit.prevent="submit">
      <div>
        <label>Title</label>
        <input v-model="title" />
      </div>
      <div>
        <label>Content</label>
        <textarea v-model="content"></textarea>
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  setup() {
    const title = ref('');
    const content = ref('');
    const router = useRouter();

    const submit = async () => {
      try {
        await axios.post('/api/posts', { title: title.value, content: content.value });
        router.push({ name: 'Admin' });
      } catch (err) {
        console.error(err);
      }
    };

    return { title, content, submit };
  }
});
</script>

<style scoped>
.create-post {
  padding: 2rem;
}
</style>
