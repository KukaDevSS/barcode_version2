<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>

  <nav class="navbar navbar-expand flex sticky-lg-top justify-content-center bg-emerald-600 text-white font-bold uppercase py-3">
    <RouterLink to="/" class="mx-2 nav-link" active-class="text-bg-dark rounded py-2 px-2">Barcode Generator</RouterLink>
    <RouterLink to="/product" class="mx-2 nav-link" active-class="text-bg-dark rounded py-2 px-2">Production</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped>
  
</style>
