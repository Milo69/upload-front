<template>
  <main class="v-event-detail">
    <template v-if="data && data.status === 'ok' && evenement">
      
      <!-- Titre principal -->
      <h1>{{ evenement.title }}</h1>
      
      <!-- Date et heure -->
      <div v-if="evenement.date || evenement.time" class="event-datetime">
        <p v-if="evenement.date">📅 <strong>Date :</strong> {{ evenement.date }}</p>
        <p v-if="evenement.time">🕐 <strong>Heure :</strong> {{ evenement.time }}</p>
      </div>
      
      <!-- Lieu -->
      <div v-if="evenement.address" class="event-location">
        <p>📍 <strong>Lieu :</strong> {{ evenement.address }}</p>
        <a v-if="evenement.googlemaps" :href="evenement.googlemaps" target="_blank">🗺️ Voir sur Google Maps</a>
      </div>
      
      <!-- Description -->
      <div v-if="evenement.description" class="event-description">
        <h2>Description</h2>
        <div v-html="evenement.description"></div>
      </div>
      
      <!-- Conditions -->
      <div v-if="evenement.conditions" class="event-conditions">
        <h2>Conditions</h2>
        <p>{{ evenement.conditions }}</p>
      </div>
      
      <!-- Bouton retour -->
      <div class="footer">
        <NuxtLink to="/programme">← Retour au programme</NuxtLink>
      </div>

    </template>

    <template v-else-if="status === 'error' || !evenement">
      <div class="error">
        <h1>Événement introuvable</h1>
        <p>Cet événement n'existe pas ou n'est pas disponible.</p>
        <NuxtLink to="/programme">← Retour au programme</NuxtLink>
      </div>
    </template>

    <template v-else>
      <div class="loading">Chargement...</div>
    </template>
  </main>
</template>

<script setup lang="ts">
import type { EventData, CMSFetchData } from '~/composables/cms_api'
const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data, status, error } = await useFetch<CMSFetchData<EventData>>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: `site.find("programme").children().find("${slug.value}")`,
    select: {
      title: true,
      slug: true,
      date: true,
      time: true,
      address: true,
      googlemaps: true,
      description: true,
      conditions: true
    }
  }
})

const evenement = computed(() => data.value?.result ?? null)

// Debug et gestion d'erreur
watchEffect(() => {
  if (status.value === 'error' || !evenement.value) {
    console.warn('[CMS] Événement introuvable ou erreur KQL')
    console.warn('slug:', slug.value)
    console.warn('data:', data.value)
    console.warn('error:', error.value)
  }
})
</script>

<style lang="scss" scoped>
</style>