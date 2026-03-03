<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/admin">Admin</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>
nav {
  padding: 1rem;
  background-color: #f5f5f5;
}
nav a {
  margin-right: 1rem;
  text-decoration: none;
  color: #42b883;
}
nav a.router-link-active {
  font-weight: bold;
}
</style>
