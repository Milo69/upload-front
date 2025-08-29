<template>
  <main class="v-index"
  >
    <div v-for="page of data?.children">
      {{page.title}}
      <NuxtLink :to="page.slug">lien</NuxtLink>
    </div>
  </main>
</template>


<script setup lang="ts">

// === [start] pour charger les data
const data = ref(null)
const slug = useRouter().currentRoute.value.params.slug

const body = {
    query: 'site',
    select: {
        children: {
            query: `site.children()`,
            select: {
                title: true,
                slug: true,
            }
        }
    },
}

onMounted(async () => {
    data.value = (await ((await fetch(`${API_BASE_URL}/api/query`, {
        method: 'POST',
        body: JSON.stringify(body),
    })).json()))?.result
})

// === [end] pour charger les data


</script>


<style lang="scss" scoped>
.v-index {
}
</style>
