<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getDomains } from '@/api/domain.api.ts'
import { createEmail } from '@/api/createEmail.api.ts'
import { getPreferences } from '@/api/preferences.api.ts'
import { getConfig } from '@/api/config.api.ts'
import type { Preferences } from '@/types/preferences.type.ts'
import type { Host, Domain, Prefix } from '@/types/config.type.ts'
import { useSearchStore } from '@/stores/search.ts'
import GlowingBackButton from '@/components/GlowingBackButton.vue'
import GlowingButtonBox from '@/components/GlowingButtonBox.vue'

const router = useRouter()
const searchStore = useSearchStore()

const domains = ref<Domain[]>([])
const preferences = ref<Preferences>()
const config = ref<Host[]>([])
const selectedHost = ref<Host | null>(null)

const selectedDomain = ref<Domain | null>(null)
const selectedPrefix = ref<Prefix | null>(null)

function backToSearch() {
  searchStore.goSearch()
  router.push('/')
}

const password = ref('')
const comment = ref('')

onMounted(async () => {
  try {
    config.value = await getConfig()
    domains.value = await getDomains()
    preferences.value = await getPreferences()
    selectedHost.value = config.value[0] ?? null
    selectedDomain.value =
      selectedHost.value?.domain.find((d) => d.id === preferences.value?.default_domain_id) ?? null
    selectedPrefix.value =
      selectedHost.value?.prefix.find((p) => p.id === preferences.value?.default_prefix_id) ?? null
  } catch (error) {}
})

async function saveEmail() {
  if (!selectedPrefix.value || !selectedDomain.value) return
  try {
    const result = await createEmail({
      prefix_id: selectedPrefix.value.id,
      name: searchStore.needle,
      domain_id: selectedDomain.value.id,
      password: password.value,
      comment: comment.value,
    })

    console.log(result.id)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="container">
    <h3>
      {{ selectedPrefix?.name }}<span v-if="selectedPrefix?.name">.</span>{{ searchStore.needle
      }}{{ selectedDomain?.name }}
    </h3>
    <div class="column gap" style="margin-top: 1rem">
      <div class="row">
        <GlowingBackButton @click="backToSearch" icon="arrow_left_alt" class="btn-small" />
        <GlowingButtonBox @click="saveEmail()" icon="mail" class="btn-small" />
      </div>
      <input type="text" placeholder="neue E-Mail" v-model="searchStore.needle" />
    </div>
    <div class="column">
      <div class="row" v-if="selectedHost && selectedHost?.domain.length > 1">
        <h3>Domain:</h3>
        <select v-model="selectedDomain">
          <option v-for="d in selectedHost?.domain" :key="d.id" :value="d">
            {{ d.name }}
          </option>
        </select>
      </div>
      <div class="row" v-if="selectedHost && selectedHost?.prefix.length > 1">
        <h3>Prefix:</h3>
        <select v-model="selectedPrefix">
          <option v-for="p in selectedHost?.prefix" :key="p.id" :value="p">
            {{ p.name }}
          </option>
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
