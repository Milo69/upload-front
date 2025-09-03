<template>
  <main class="v-home">
    <template v-if="data && data.status === 'ok'">
      <!-- Page Home depuis CMS -->
      <section v-if="data.result?.title" class="hero">
        <h1>{{ data.result.title }}</h1>
        <div v-if="data.result.intro" v-html="data.result.intro" class="intro"></div>
      </section>

      <!-- Section exposants -->
      <section v-if="exposantsData && exposantsData.status === 'ok' && exposantsData.result?.length" class="exposants-section">
        <h2>Exposants</h2>
        <AppExposantsList :exposants="exposantsData.result" />
      </section>

    </template>

    <template v-else-if="status === 'error'">
      <div class="error">
        Erreur de chargement du contenu
      </div>
    </template>

    <template v-else>
      <div class="loading">Chargement...</div>
    </template>
  </main>
</template>

<script setup lang="ts">
import type { HomeData, ExposantData, CMSFetchData, CMSListData } from '~/composables/cms_api'

const { data, status } = await useFetch<CMSFetchData<HomeData>>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: "site.find('home')",
    select: {
      title: true,
      slug: true,
      intro: true
    }
  }
})

const { data: exposantsData } = await useFetch<CMSListData<ExposantData>>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: "site.find('exposants').children()",
    select: {
      title: true,
      slug: true,
      content_subtitle: true,
      info_image: {
        query: 'page.info_image.toFiles',
        select: {
          url: true,
          alt: true,
          width: true,
          height: true
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.v-home {
}
</style>
