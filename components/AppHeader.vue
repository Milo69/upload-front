<template>
  <header class="app-header">
    <div class="header-content">
      <NuxtLink to="/" class="logo-link">
        <img src="/img/Logo_Upload-Web.svg" alt="Upload Logo" class="logo" />
      </NuxtLink>
      
      <nav class="main-navigation">
        <NuxtLink to="/" class="nav-link">Accueil</NuxtLink>
        <NuxtLink to="/exposants" class="nav-link">Exposants</NuxtLink>
        <NuxtLink to="/programme" class="nav-link">Programme</NuxtLink>
        <NuxtLink to="/apropos" class="nav-link">À propos</NuxtLink>
        <NuxtLink to="/infos-pratiques" class="nav-link">Infos pratiques</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// Component logic here if needed
</script>

<style lang="scss" scoped>
</style>