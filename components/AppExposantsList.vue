<template>
  <div class="exposants-list">
    <AppExposantCard
      v-for="exposant in exposants"
      :key="exposant.slug"
      :exposant="exposant"
    />
  </div>
</template>

<script setup lang="ts">
import type { ExposantData } from '~/composables/cms_api'

interface Props {
  exposants: ExposantData[]
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.exposants-list {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>