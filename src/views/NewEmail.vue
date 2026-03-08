<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getDomains } from '@/api/domain.api.ts'
import { getPrefix } from '@/api/prefix.api.ts'
import type { Domain } from '@/types/domain.type.ts'
import type { Prefix } from '@/types/prefix.types.ts'
import { useSearchStore } from '@/stores/search.ts'
import GlowingBackButton from '@/components/GlowingBackButton.vue'
import GlowingButtonBox from '@/components/GlowingButtonBox.vue'
import { createEmail } from '@/api/createEmail.api.ts'

const router = useRouter()
const searchStore = useSearchStore()

const selectedDomain = ref<Domain | null>(null)
const selectedPrefix = ref<Prefix | null>(null)

function backToSearch() {
  searchStore.goSearch()
  router.push('/')
}

const domains = ref<Domain[]>([])
const prefixes = ref<Prefix[]>([])

const password = ref('')
const comment = ref('')

onMounted(async () => {
  try {
    domains.value = await getDomains()

    const firstDomain = domains.value[0]
    if (!firstDomain) return

    selectedDomain.value = firstDomain
    prefixes.value = await getPrefix(firstDomain.host_id)

    const firstPrefix = prefixes.value[0]
    if (firstPrefix) {
      selectedPrefix.value = firstPrefix
    }
  } catch (error) {
    console.log(error)
  }
})

async function saveEmail() {
  try {
    const result = await createEmail({
      prefix_id: selectedPrefix.value?.id,
      name: searchStore.needle,
      domain_id: selectedDomain.value?.id,
      password: password.value,
      comment: comment.value,
    })

    console.log(result.id)
  } catch (error) {
    console.log(error)
  }
}

function test() {
  console.log('Prefix-ID: ' + selectedPrefix.value?.id)
  console.log('Domain-ID: ' + selectedDomain.value?.id)
  console.log('Password: ' + password.value)
  console.log('Comment: ' + comment.value)
}
</script>

<template>
  <div class="container">
    <h3>
      {{ selectedPrefix?.name }}<span v-if="selectedPrefix && selectedPrefix.name.length > 0">.</span
      >{{ searchStore.needle }}{{ selectedDomain?.name }}
    </h3>
    <div class="column gap" style="margin-top: 1rem">
      <div class="row">
        <GlowingBackButton @click="backToSearch" icon="arrow_left_alt" class="btn-small" />
        <GlowingButtonBox @click="saveEmail()" icon="mail" class="btn-small" />
      </div>
      <input type="text" placeholder="neue E-Mail" v-model="searchStore.needle" />
    </div>
    <div class="column">
      <div class="row">
        <h3>Prefix:</h3>
        <select v-model="selectedPrefix">
          <option v-for="p in prefixes" :key="p.id" :value="p">{{ p.name }}</option>
        </select>
      </div>
      <div class="row">
        <h3>Domain:</h3>
        <select v-model="selectedDomain">
          <option v-for="d in domains" :key="d.id" :value="d">{{ d.name }}</option>
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
