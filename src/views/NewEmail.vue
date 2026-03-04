<script setup lang="ts">
import { useRouter } from 'vue-router'
import GlowingBackButton from '@/components/GlowingBackButton.vue'
import GlowingButtonBox from '@/components/GlowingButtonBox.vue'

const router = useRouter()
</script>

<template>
  <div class="container">
    <h3>Neue Email</h3>
    <div class="column gap" style="margin-top: 1rem">
      <div class="row">
        <GlowingBackButton @click="router.push('/')" icon="arrow_left_alt" class="btn-small" />
        <GlowingButtonBox @click="router.push('/')" icon="mail" class="btn-small" />
      </div>
      <input type="text" placeholder="neue E-Mail" />
    </div>
    <div class="column">
      <div class="row">
        <h3>Prefix:</h3>
        <select name="prefix" id="prefix">
          <option value="">Keins</option>
          <option value="lu">lu</option>
          <option value="dj">dj</option>
        </select>
      </div>
      <div class="row">
        <h3>Domain:</h3>
        <select name="domain" id="domain">
          <option value="unschuld.org">@unschuld.org</option>
          <option value="lisawichmann.de">@lisawichmann.de</option>
          <option value="blackserver.de">@blackserver.de</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  justify-content: start;
}

.row {
  width: 85vw;
  justify-content: space-between;
  align-items: center;
}

input {
  width: 85vw;
}
</style>
