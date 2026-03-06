<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="card shadow-sm" style="width: 100%; max-width: 420px;">
      <div class="card-body p-4">
        <h4 class="card-title text-center mb-4">Admin Login</h4>
        <form @submit.prevent="submit">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-control"
              placeholder="you@example.com"
              required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control"
              placeholder="••••••••"
              required
            />
          </div>
          <div v-if="error" class="alert alert-danger py-2" role="alert">
            {{ error }}
          </div>
          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
            {{ loading ? 'Signing in…' : 'Sign in' }}
          </button>
        </form>
      </div>
    </div>
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
    const error = ref('');
    const loading = ref(false);
    const router = useRouter();

    const submit = async () => {
      error.value = '';
      loading.value = true;
      try {
        const res = await axios.post('/api/auth/login', { email: email.value, password: password.value });
        const token = res.data.token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        router.push({ name: 'Admin' });
      } catch (err) {
        console.error(err);
        error.value = 'Invalid credentials. Please try again.';
      } finally {
        loading.value = false;
      }
    };

    return { email, password, error, loading, submit };
  }
});
</script>
