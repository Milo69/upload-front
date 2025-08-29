<template>
  <main class="v-slug"
  >
    {{data}}
  </main>
</template>


<script setup lang="ts">

import {API_BASE_URL} from "~/composables/params";

// === [start] pour charger les data
const data = ref(null)
const slug = useRouter().currentRoute.value.params.slug

const body = {
    query: 'site',
    select: {
        page: {
            query: `site.find('${slug}')`,
            select: {
                title: true,
                slug: true,
            }
        }
    },
}

onMounted(async () => {
  data.value = await ((await fetch(`${API_BASE_URL}/api/query`, {
      method: 'POST',
      body: JSON.stringify(body),
  })).json())
})

// === [end] pour charger les data


</script>


<style lang="scss" scoped>
.v-slug {
}
</style>
