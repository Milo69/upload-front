<template>
  <div class="bio-modal-overlay" @click="closeModal">
    <div class="bio-modal-content" @click.stop>
      <!-- Bouton fermer (croix) -->
      <button class="close-button" @click="closeModal" aria-label="Fermer">
        <span class="close-icon">×</span>
      </button>
      
      <!-- Contenu de la bio -->
      <div class="bio-text" v-html="bioText"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  bioText: string
}

interface Emits {
  close: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const closeModal = () => {
  emit('close')
}

// Fermer avec Escape et empêcher le scroll
onMounted(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal()
    }
  }
  document.addEventListener('keydown', handleEscape)
  
  // Empêcher le scroll du body
  document.body.style.overflow = 'hidden'
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = ''
  })
})
</script>

<style lang="scss" scoped>
.bio-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-l);
}

.bio-modal-content {
  background-color: var(--color-white);
  border: 5px solid var(--color-black);
  max-width: 500px;
  width: 100%;
  max-height: 75vh;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    max-height: 70vh;
  }
}

.close-button {
  position: sticky;
  top: var(--space-s);
  align-self: flex-end;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  margin-right: var(--space-s);
  margin-top: var(--space-s);
}

.close-icon {
  font-size: 3rem;
  font-weight: 300;
  color: var(--color-black);
  line-height: 1;
}

.bio-text {
  padding: 0 var(--space-l) var(--space-l) var(--space-l);
  margin-top: calc(-1 * (var(--space-s) + var(--space-xs) + 3rem));
  
  @media (max-width: 768px) {
    padding: 0 var(--space-m) var(--space-m) var(--space-m);
  }
  
  :deep(p) {
    margin-bottom: var(--space-m);
    line-height: 1.4;
    
    &:first-child {
      margin-top: calc(var(--space-s) + var(--space-xs) + var(--space-l));
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4) {
    margin-bottom: var(--space-s);
    margin-top: var(--space-l);
    
    &:first-child {
      margin-top: calc(var(--space-s) + var(--space-xs) + 3rem + var(--space-xl));
    }
  }
}
</style>