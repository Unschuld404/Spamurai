<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search.ts'
import GlowingBackButton from '@/components/GlowingBackButton.vue'
import GlowingButtonBox from '@/components/GlowingButtonBox.vue'
import type { Host, Prefix, Domain } from '@/types/config.type.ts'
import { getConfig } from '@/api/config.api.ts'
import { getPreferences } from '@/api/preferences.api.ts'
import { createEmail } from '@/api/createEmail.api.ts'
import { copyToClipboard } from '@/api/CopyToClipboard.ts'
import { subscribe } from '@/api/subscribe.api.ts'

const router = useRouter()
const searchStore = useSearchStore()

const comment = ref('')
const password = ref('')

function backToSearch() {
  searchStore.goSearch()
  router.push('/')
}

const selectedHost = ref<Host | null>(null)

const selectedPrefixId = ref<number | null>(null)
const selectedDomainId = ref<number | null>(null)

const prefix = computed<Prefix | null>(() => {
  return selectedHost.value?.prefix.find((p) => p.id === selectedPrefixId.value) ?? null
})

const domain = computed<Domain | null>(() => {
  return selectedHost.value?.domain.find((d) => d.id === selectedDomainId.value) ?? null
})

const showPW = ref<boolean | null>(null)

const email = computed(() => {
  return `${prefix.value?.name ?? ''}${prefix.value?.name ? '.' : ''}${searchStore.needle}${domain.value?.name ?? ''}`
})

onMounted(async () => {
  try {
    const config = await getConfig()
    selectedHost.value = config[0] ?? null

    const preferences = await getPreferences()

    selectedPrefixId.value =
      selectedHost.value?.prefix.find((p) => p.id === preferences.default_prefix_id)?.id ??
      selectedHost.value?.prefix[0]?.id ??
      null

    selectedDomainId.value =
      selectedHost.value?.domain.find((d) => d.id === preferences.default_domain_id)?.id ??
      selectedHost.value?.domain[0]?.id ??
      null

    showPW.value = preferences.use_passwords
  } catch (error) {
    console.log(error)
  }
})

async function saveEmail() {
  console.log('Domain', selectedDomainId)
  console.log('Prefix:', selectedPrefixId)
  if (!selectedPrefixId.value || !selectedDomainId.value || !searchStore.needle) {
    return
  }
  const emailText = email.value
  try {
    await copyToClipboard(emailText)
    const result = await createEmail({
      prefix_id: selectedPrefixId.value,
      domain_id: selectedDomainId.value,
      name: searchStore.needle,
      comment: comment.value,
      password: password.value,
    })
    await subscribe(result.id)
    console.log(result)
    console.log(result.id)
    await router.push(`/email-details/${result.id}`)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="container">
    <h3>
      {{ email }}
    </h3>
    <div class="column gap" style="margin-top: 1rem">
      <div class="row">
        <GlowingBackButton @click="backToSearch" icon="arrow_left_alt" class="btn-small" />
        <GlowingButtonBox icon="mail" class="btn-small" @click="saveEmail" />
      </div>
      <input type="text" placeholder="neue E-Mail" v-model="searchStore.needle" />
    </div>

    <div class="column">
      <div class="row" v-if="(selectedHost?.domain?.length ?? 0) > 1">
        <h3>Domain:</h3>
        <select v-model="selectedDomainId">
          <option v-for="d in selectedHost?.domain" :key="d.id" :value="d.id">
            {{ d.name }}
          </option>
        </select>
      </div>

      <div class="row" v-if="(selectedHost?.prefix?.length ?? 0) > 1">
        <h3>Prefix:</h3>
        <select v-model="selectedPrefixId">
          <option v-for="p in selectedHost?.prefix" :key="p.id" :value="p.id">
            {{ p.name }}
          </option>
        </select>
      </div>
      <div class="column" style="margin-top: 1rem">
        <p>Kommentar:</p>
        <input type="text" class="info" v-model="comment" />
        <div v-if="showPW">
          <p>Passwort:</p>
          <input type="text" class="info" v-model="password" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  color: var(--color-secondary);
  margin-bottom: 0;
}

.info {
  width: 100%;
}

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
