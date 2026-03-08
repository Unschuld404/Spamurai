<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import GlowingButtonBox from '@/components/GlowingButtonBox.vue'
import RadioButtons from '@/components/RadioButtons.vue'

const router = useRouter()

const selected = ref<string | number | null>(null)

function feedback () {
  console.log(selected.value)
}

const options = [
  { value: 1, label: 'Kommentar'},
  { value: 2, label: 'Passwort' },
  { value: 3, label: 'Kern' },
]

</script>

<template>
  <div class="container">
    <h3>Passwort-System</h3>
    <RadioButtons model-value="selected" name="category" :options="options" @click="feedback" />
    <GlowingButtonBox icon="arrow_left_alt" class="btn-small" @click="router.push('/')" />
  </div>
</template>

<style scoped>
input[type='radio'] {
  -webkit-appearance: none;
  appearance: none;
}

label {
  border: 1px solid green;
}
</style>
