<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getEmailDetails } from '@/api/emailDetails.api.ts'
import { copyToClipboard } from '@/api/CopyToClipboard.ts'
import { subscribe, unsubscribe } from '@/api/subscribe.api.ts'
import type { Email } from '@/types/email.type.ts'
import { useEmailStore } from '@/stores/email.ts'
import GlowingBackButton from '@/components/GlowingBackButton.vue'
import GlowingButtonBox from '@/components/GlowingButtonBox.vue'
import Password from '@/components/Password.vue'

const router = useRouter()
const emailStore = useEmailStore()
const emailID = emailStore.id
const email = ref<Email>()

function closeEmailDetails(id: number) {
  emailStore.clearID(id)
  console.log('Ich vergesse die ID, sie ist jetzt ' + emailStore.id)
  router.push('/')
}

onMounted(async () => {
  try {
    email.value = await getEmailDetails(emailID)
    console.log(email.value)
  } catch (error) {}
})

async function subscribeToEmail() {
  try {
    await subscribe(emailStore.id ?? 0)
    email.value = await getEmailDetails(emailID)
  } catch (error) {}
}

async function unsubscribeFromEmail() {
  try {
    await unsubscribe(emailStore.id ?? 0)
    email.value = await getEmailDetails(emailID)
  } catch (error) {}
}
</script>

<template>
  <div class="container">
    <div class="row" style="padding-top: 2rem">
      <h3>{{ email?.email }}</h3>
      <span class="material-symbols-rounded" @click="copyToClipboard(`${email?.email}`)"
        >content_copy</span
      >
    </div>
    <div class="row">
      <GlowingBackButton
        icon="notifications_off"
        class="btn-box"
        v-if="!email?.has_target && email?.is_owner && email?.active"
        @click="subscribeToEmail"
      />
      <GlowingBackButton
        icon="notifications_off"
        class="btn-box"
        v-if="!email?.has_target && !email?.is_owner && email?.is_shared && email?.active"
        @click="subscribeToEmail"
      />
      <GlowingButtonBox
        icon="notifications"
        class="btn-box"
        v-if="email?.has_target && email?.active"
        @click="unsubscribeFromEmail()"
      />

      <GlowingBackButton icon="eye_tracking" class="btn-box" />

      <GlowingBackButton icon="group" class="btn-box" />

      <GlowingBackButton icon="recenter" class="btn-box" />
    </div>

    <div class="commentary column" v-if="email?.comment">
      <textarea placeholder="Kommentar">{{ email.comment }}</textarea>
    </div>
    <Password :password="email?.password" />
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
  height: 2.3rem;
  padding: 0.5rem 1rem;
  background-color: transparent;
  font-family: inherit;
  color: inherit;
  font-size: inherit;
  border: 1px solid var(--color-primary);
  border-radius: 5px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  caret-color: var(--color-primary-transparent);
  box-sizing: border-box;
}

textarea:focus {
  outline: 2px solid var(--color-primary);
}

textarea::placeholder {
  color: var(--color-primary-transparent);
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

.btn-box {
  height: 75px;
  width: 75px;
}
</style>
