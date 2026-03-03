<script setup lang="ts">
import { useRouter } from 'vue-router'
import GlowingButton from '@/components/GlowingButton.vue'
import GlowingBackButton from '@/components/GlowingBackButton.vue'
import Target from '@/components/Target.vue'

const router = useRouter()

const isShared = false
const hasTarget = true
</script>

<template>
  <div class="container">
    <h3>beispiel@email.de</h3>

    <div class="column gap" v-if="isShared">
      <GlowingButton name="abonnieren" />
      <GlowingBackButton name="stumm" />
    </div>

    <div class="column gap" v-if="hasTarget">
      <Target email="postfach1@unschuld.org" />
      <Target email="postfach2@blackserver.de" />
      <Target email="postfach3@mutti.com" />
      <GlowingButton name="+" class="circle" />
    </div>

    <div class="commentary">
      <p>Das hier ist ein Beispielkommentar.</p>
    </div>
    <div class="row">
      <GlowingBackButton @click="router.push('/')" name="zurück" class="btn-small" />
      <GlowingButton name="Kopieren" class="btn-small" />
    </div>
  </div>
</template>

<style scoped>

.column {
  margin-top: 1rem;
  align-items: center;
}

.row {
  width: 350px;
  justify-content: space-between;
}

.circle {
  width: 50px;
  font-weight: bold;
  font-size: 1.8rem;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>
