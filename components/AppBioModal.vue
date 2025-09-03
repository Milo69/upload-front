<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="modal-close" @click="closeModal">×</button>
      
      <div class="modal-body">
        <h3>Bio</h3>
        <div class="bio-text" v-html="bioText"></div>
      </div>
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
</script>

<style lang="scss" scoped>
</style>