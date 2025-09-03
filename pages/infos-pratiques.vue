<template>
  <main class="v-infos">
    <template v-if="data && data.status === 'ok'">
      
      <h1>{{ data.result?.title || 'Infos Pratiques' }}</h1>
      
      <!-- Horaires -->
      <section v-if="data.result?.horaires">
        <h2>Horaires d'ouverture</h2>
        <div v-html="data.result.horaires"></div>
      </section>

      <!-- Lieux de la biennale -->
      <section v-if="data.result?.lieu_biennale?.length">
        <h2>Lieux de la biennale</h2>
        <div v-for="lieu in data.result.lieu_biennale" :key="lieu.nom">
          <h3>{{ lieu.nom }}</h3>
          <p>{{ lieu.adresse }}</p>
          <a v-if="lieu.maps" :href="lieu.maps" target="_blank">📍 Voir sur Google Maps</a>
        </div>
      </section>

      <!-- Autres lieux -->
      <section v-if="data.result?.autres_lieux?.length">
        <h2>Autres lieux</h2>
        <div v-for="lieu in data.result.autres_lieux" :key="lieu.nom">
          <h3>{{ lieu.nom }}</h3>
          <p>{{ lieu.adresse }}</p>
          <a v-if="lieu.maps" :href="lieu.maps" target="_blank">📍 Voir sur Google Maps</a>
        </div>
      </section>

      <!-- Accessibilité -->
      <section v-if="data.result?.accessibilite">
        <h2>Accessibilité</h2>
        <div v-html="data.result.accessibilite"></div>
      </section>

      <!-- Contact -->
      <section v-if="data.result?.contact_email || data.result?.instagram_label">
        <h2>Contact</h2>
        <p v-if="data.result.contact_email">
          Email : <a :href="'mailto:' + data.result.contact_email">{{ data.result.contact_email }}</a>
        </p>
        <p v-if="data.result.instagram_label && data.result.instagram_url">
          Instagram : <a :href="data.result.instagram_url" target="_blank">{{ data.result.instagram_label }}</a>
        </p>
      </section>

    </template>

    <template v-else-if="status === 'error'">
      <div class="error">Erreur de chargement des infos pratiques</div>
    </template>

    <template v-else>
      <div class="loading">Chargement...</div>
    </template>
  </main>
</template>

<script setup lang="ts">
import type { InfosPratiquesData, CMSFetchData } from '~/composables/cms_api'

const { data, status } = await useFetch<CMSFetchData<InfosPratiquesData>>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: "site.find('infospratiques')",
    select: {
      title: true,
      slug: true,
      horaires: true,
      lieu_biennale: {
        query: 'page.lieu_biennale.toStructure()',
        select: {
          nom: 'structureItem.nom.value',
          adresse: 'structureItem.adresse.value',
          maps: 'structureItem.maps.value'
        }
      },
      autres_lieux: {
        query: 'page.autres_lieux.toStructure()',
        select: {
          nom: 'structureItem.nom.value',
          adresse: 'structureItem.adresse.value',
          maps: 'structureItem.maps.value'
        }
      },
      accessibilite: true,
      contact_email: true,
      instagram_label: true,
      instagram_url: true
    }
  }
})
</script>

<style lang="scss" scoped>
</style>