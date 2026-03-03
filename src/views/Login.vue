<template>
  <div class="login">
    <h1>Admin Login</h1>
    <form @submit.prevent="submit">
      <div>
        <label>Email</label>
        <input v-model="email" type="email" />
      </div>
      <div>
        <label>Password</label>
        <input v-model="password" type="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  setup() {
    const email = ref('test@test.nl');
    const password = ref('test123!');
    const router = useRouter();

    const submit = async () => {
      try {
        const res = await axios.post('/api/auth/login', { email: email.value, password: password.value });
        const token = res.data.token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        router.push({ name: 'Admin' });
      } catch (err) {
        console.error(err);
        alert('Login failed');
      }
    };

    return { email, password, submit };
  }
});
</script>

<style scoped>
.login { padding: 2rem; }
</style>
