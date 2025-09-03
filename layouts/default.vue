<template>
  <div class="app-layout">
    <AppHeader />

    <main class="app-main">
      <slot />
    </main>

    <footer class="app-footer">
      <p>&copy; 2025 - Site événement</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Layout logic here if needed
</script>

<style lang="scss" scoped>
</style>