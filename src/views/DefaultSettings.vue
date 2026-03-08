<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getDomains } from '@/api/domain.api.ts'
import GlowingBackButton from '@/components/GlowingBackButton.vue'
import type { Domain } from '@/types/domain.type.ts'
import type { Preferences } from '@/types/preferences.type.ts'
import type { Host } from '@/types/config.type.ts'
import { getPreferences } from '@/api/preferences.api.ts'
import { getConfig } from '@/api/config.api.ts'

const router = useRouter()

const domains = ref<Domain[]>([])
const preferences = ref<Preferences>()
const config = ref<Host[]>([])
const selectedHost = ref<Host | null>(null)

onMounted(async () => {
  try {
    config.value = await getConfig()
    domains.value = await getDomains()
    preferences.value = await getPreferences()
    selectedHost.value = config.value[0] ?? null
    console.log(config.value)
  } catch (error) {}
})
</script>

<template>
  <div class="container">
    <div class="column gap" style="align-items: center">
      <h3>Standards</h3>
      <div class="row">
        <h3>Host:</h3>
        <select v-model="selectedHost">
          <option
            v-for="h in config"
            :key="h.id"
            :value="h"
          >
            {{ h.caption }}
          </option>
        </select>
      </div>
      <div class="row">
        <h3>Domain:</h3>
        <select>
          <option
            v-for="d in selectedHost?.domain"
            :key="d.id"
            :name="d.name"
            :value="d.id"
            :selected="preferences?.default_domain_id === d.id"
          >
            {{ d.name }}
          </option>
        </select>
      </div>
      <div class="row">
        <h3>Prefix:</h3>
        <select>
          <option
            v-for="p in selectedHost?.prefix"
            :key="p.id"
            :name="p.name"
            :value="p.id"
            :selected="preferences?.default_prefix_id === p.id"
          >
            {{ p.name }}
          </option>
        </select>
      </div>
    </div>
    <GlowingBackButton icon="arrow_left_alt" class="btn-small" @click="router.push('/')" />
  </div>
</template>

<style scoped>
.column {
  align-items: end;
}

.row {
  width: 90vw;
  justify-content: space-between;
}
</style>
