<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getTarget } from '@/api/target.api.ts'
import { getEmailDetails } from '@/api/emailDetails.api.ts'
import type { Target } from '@/types/target.type.ts'
import type { Email } from '@/types/email.type.ts'
import { useEmailStore } from '@/stores/email.ts'
import GlowingButton from '@/components/GlowingButton.vue'
import GlowingBackButton from '@/components/GlowingBackButton.vue'
import TargetPlate from '@/components/TargetPlate.vue'
import GlowingButtonBox from '@/components/GlowingButtonBox.vue'

const router = useRouter()
const emailStore = useEmailStore()
const emailID = emailStore.id
const email = ref<Email | null>(null)

const isShared = false

const targetsVisible = ref(false)

function toggleTargetVisibility() {
  targetsVisible.value = !targetsVisible.value
}

function closeEmailDetails(id: number) {
  emailStore.clearID(id)
  console.log('Ich vergesse die ID, sie ist jetzt ' + emailStore.id)
  router.push('/')
}

const possibleTargets = ref<Target[]>([])

onMounted(async () => {
  try {
    possibleTargets.value = await getTarget()
  } catch (error) {}
})

onMounted(async () => {
  try {
    email.value = await getEmailDetails(emailID)
    console.log(email.value)
  } catch (error) {}
})
</script>

<template>
  <div class="container">
    <div class="row" style="padding-top: 2rem">
      <h3>{{ email?.email }}</h3>
      <span class="material-symbols-rounded">content_copy</span>
    </div>

    <div class="column gap" v-if="isShared">
      <GlowingButton name="abonnieren" />
      <GlowingBackButton name="stumm" />
    </div>

    <div class="column gap">
      <TargetPlate v-for="t in possibleTargets" :caption="t.caption" v-if="targetsVisible" />
      <GlowingButtonBox name="Ziele bearbeiten" @click="toggleTargetVisibility()" />
    </div>

    <div class="commentary column" v-if="email?.comment">
      <textarea>{{ email.comment }}</textarea>
    </div>
    <GlowingBackButton @click="closeEmailDetails" icon="arrow_left_alt" class="btn-small" />
  </div>
</template>

<style scoped>
span {
  color: var(--color-secondary);
  text-shadow: 0 0 1px var(--color-secondary);
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
}

textarea {
  width: 100%;
  height: 5.5rem;
  background-color: transparent;
  font-family: inherit;
  color: inherit;
  font-size: inherit;
  border: none;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.column {
  margin-top: 1rem;
  align-items: center;
}

.row {
  width: 350px;
  justify-content: space-between;
  align-items: center;
}
</style>
