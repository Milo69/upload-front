<template>
  <main class="v-index"
  >
    hello {{data?.hello}}
  </main>
</template>


<script setup lang="ts">

const { data } = await useFetch('/api/hello')

</script>


<style lang="scss" scoped>
.v-index {
}
</style>
