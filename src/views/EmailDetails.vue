<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { copyToClipboard } from '@/api/CopyToClipboard.ts'
import { getEmailDetails } from '@/api/emailDetails.api.ts'
import { addEmailShare, removeEmailShare } from '@/api/share.api.ts'
import { addEmailToSpace, getSpaces, removeEmailFromSpace } from '@/api/space.api.ts'
import { subscribe, unsubscribe } from '@/api/subscribe.api.ts'
import { createTarget, deleteTarget, getTargets } from '@/api/target.api.ts'
import { updateEmail } from '@/api/updateEmail.api.ts'
import { getUser, getUserList } from '@/api/user.api.ts'
import GlowingBackButton from '@/components/GlowingBackButton.vue'
import type { Email, EmailTarget } from '@/types/email.type.ts'
import type { Space } from '@/types/space.type.ts'
import type { Target } from '@/types/target.type.ts'
import type { User } from '@/types/user.type.ts'
import { useEmailStore } from '@/stores/email.ts'

const router = useRouter()
const route = useRoute()
const emailStore = useEmailStore()

const detail = ref<Email | null>(null)
const currentUser = ref<User | null>(null)
const spaces = ref<Space[]>([])
const users = ref<User[]>([])
const knownTargets = ref<Target[]>([])

const loadingPage = ref(true)
const reloadingDetail = ref(false)
const errorBanner = ref<string | null>(null)

const savingPassword = ref(false)
const savingComment = ref(false)
const creatingExternalTarget = ref(false)

const mutatingSpaceIds = ref<number[]>([])
const mutatingShareUserIds = ref<number[]>([])
const mutatingTargetIds = ref<number[]>([])
const deletingExternalTargetIds = ref<number[]>([])

const passwordDraft = ref('')
const commentDraft = ref('')
const selectedSpaceId = ref<number | null>(null)
const selectedShareUserId = ref<number | null>(null)
const externalTargetAddress = ref('')
const externalTargetCaption = ref('')

const emailId = computed(() => Number(route.params.id ?? emailStore.id ?? 0))

const assignedSpaceIds = computed(() => new Set((detail.value?.spaces ?? []).map((space) => space.id)))
const sharedUserIds = computed(() => new Set((detail.value?.shared ?? []).map((user) => user.id)))
const activeTargetIds = computed(
  () => new Set((detail.value?.targets ?? []).map((target) => String(target.id))),
)

const availableSpaces = computed(() =>
  spaces.value.filter((space) => !assignedSpaceIds.value.has(space.id)),
)

const availableUsers = computed(() =>
  users.value.filter((user) => {
    if (sharedUserIds.value.has(user.id)) return false
    if (detail.value?.owner_id && user.id === detail.value.owner_id) return false
    return true
  }),
)

const normalizedKnownTargets = computed(() =>
  knownTargets.value.map((target) => ({
    id: String(target.id),
    label: target.caption || target.name || target.address || target.email || `Target ${target.id}`,
    address: target.address || target.email || '',
  })),
)

const externalTargets = computed(() => {
  const knownIds = new Set(normalizedKnownTargets.value.map((target) => target.id))
  return (detail.value?.targets ?? [])
    .filter((target) => !knownIds.has(String(target.id)))
    .map((target) => ({
      id: target.id,
      label: getTargetLabel(target),
      address: getTargetAddress(target),
    }))
})

function getTargetAddress(target: EmailTarget | Target) {
  return target.address || target.email || ''
}

function getTargetLabel(target: EmailTarget | Target) {
  return target.caption || target.name || getTargetAddress(target) || `Target ${target.id}`
}

function setDrafts(email: Email) {
  passwordDraft.value = email.password ?? ''
  commentDraft.value = email.comment ?? ''
}

function addPending(list: Ref<number[]>, id: number | string) {
  list.value = [...list.value, Number(id)]
}

function removePending(list: Ref<number[]>, id: number | string) {
  list.value = list.value.filter((entry) => entry !== Number(id))
}

function closeEmailDetails() {
  emailStore.clearID(emailId.value)
  router.push('/')
}

async function loadLookups() {
  const [me, spaceList, userList, targetList] = await Promise.all([
    getUser(),
    getSpaces(),
    getUserList(),
    getTargets(),
  ])

  currentUser.value = me
  spaces.value = spaceList
  users.value = userList
  knownTargets.value = targetList
}

async function reloadDetail() {
  reloadingDetail.value = true

  try {
    detail.value = await getEmailDetails(emailId.value)
    if (detail.value) {
      setDrafts(detail.value)
    }
  } finally {
    reloadingDetail.value = false
  }
}

async function loadPage() {
  loadingPage.value = true
  errorBanner.value = null

  try {
    await Promise.all([reloadDetail(), loadLookups()])
  } catch (error) {
    errorBanner.value = error instanceof Error ? error.message : 'Detailansicht konnte nicht geladen werden'
  } finally {
    loadingPage.value = false
  }
}

async function savePassword() {
  if (!detail.value) return

  savingPassword.value = true
  errorBanner.value = null

  try {
    await updateEmail({
      id: detail.value.email_id,
      password: passwordDraft.value || null,
      comment: detail.value.comment ?? '',
    })
    await reloadDetail()
  } catch (error) {
    errorBanner.value = error instanceof Error ? error.message : 'Passwort konnte nicht gespeichert werden'
  } finally {
    savingPassword.value = false
  }
}

async function saveComment() {
  if (!detail.value) return

  savingComment.value = true
  errorBanner.value = null

  try {
    await updateEmail({
      id: detail.value.email_id,
      password: detail.value.password ?? null,
      comment: commentDraft.value,
    })
    await reloadDetail()
  } catch (error) {
    errorBanner.value = error instanceof Error ? error.message : 'Kommentar konnte nicht gespeichert werden'
  } finally {
    savingComment.value = false
  }
}

async function assignSpace() {
  if (!detail.value || !selectedSpaceId.value) return
  const spaceId = selectedSpaceId.value

  addPending(mutatingSpaceIds, spaceId)
  errorBanner.value = null

  try {
    await addEmailToSpace(detail.value.email_id, spaceId)
    selectedSpaceId.value = null
    await reloadDetail()
  } catch (error) {
    errorBanner.value = error instanceof Error ? error.message : 'Space konnte nicht zugewiesen werden'
  } finally {
    removePending(mutatingSpaceIds, spaceId)
  }
}

async function unassignSpace(spaceId: number) {
  if (!detail.value) return

  addPending(mutatingSpaceIds, spaceId)
  errorBanner.value = null

  try {
    await removeEmailFromSpace(detail.value.email_id, spaceId)
    await reloadDetail()
  } catch (error) {
    errorBanner.value = error instanceof Error ? error.message : 'Space konnte nicht entfernt werden'
  } finally {
    removePending(mutatingSpaceIds, spaceId)
  }
}

async function addShare() {
  if (!detail.value || !selectedShareUserId.value) return
  const userId = selectedShareUserId.value

  addPending(mutatingShareUserIds, userId)
  errorBanner.value = null

  try {
    await addEmailShare(detail.value.email_id, userId)
    selectedShareUserId.value = null
    await reloadDetail()
  } catch (error) {
    errorBanner.value = error instanceof Error ? error.message : 'Freigabe konnte nicht hinzugefuegt werden'
  } finally {
    removePending(mutatingShareUserIds, userId)
  }
}

async function removeShare(userId: number) {
  if (!detail.value) return

  addPending(mutatingShareUserIds, userId)
  errorBanner.value = null

  try {
    await removeEmailShare(detail.value.email_id, userId)
    await reloadDetail()
  } catch (error) {
    errorBanner.value = error instanceof Error ? error.message : 'Freigabe konnte nicht entfernt werden'
  } finally {
    removePending(mutatingShareUserIds, userId)
  }
}

async function makeExclusive() {
  if (!detail.value || detail.value.shared.length === 0) return
  if (!window.confirm('Alle Freigaben entfernen und die E-Mail wieder exklusiv machen?')) return

  errorBanner.value = null

  try {
    for (const user of detail.value.shared) {
      addPending(mutatingShareUserIds, user.id)
      await removeEmailShare(detail.value.email_id, user.id)
      removePending(mutatingShareUserIds, user.id)
    }
    await reloadDetail()
  } catch (error) {
    errorBanner.value = error instanceof Error ? error.message : 'E-Mail konnte nicht exklusiv gemacht werden'
  } finally {
    mutatingShareUserIds.value = []
  }
}

async function toggleKnownTarget(targetId: string) {
  if (!detail.value) return

  addPending(mutatingTargetIds, targetId)
  errorBanner.value = null

  try {
    if (activeTargetIds.value.has(targetId)) {
      await unsubscribe(detail.value.email_id, targetId)
    } else {
      await subscribe(detail.value.email_id, targetId)
    }
    await reloadDetail()
  } catch (error) {
    errorBanner.value = error instanceof Error ? error.message : 'Target konnte nicht aktualisiert werden'
  } finally {
    removePending(mutatingTargetIds, targetId)
  }
}

async function createExternalTarget() {
  if (!externalTargetAddress.value.trim()) {
    errorBanner.value = 'Die externe Zieladresse ist ein Pflichtfeld.'
    return
  }

  creatingExternalTarget.value = true
  errorBanner.value = null

  try {
    await createTarget({
      address: externalTargetAddress.value.trim(),
      caption: externalTargetCaption.value.trim() || undefined,
    })
    externalTargetAddress.value = ''
    externalTargetCaption.value = ''
    await Promise.all([reloadDetail(), loadLookups()])
  } catch (error) {
    errorBanner.value = error instanceof Error ? error.message : 'Externes Target konnte nicht angelegt werden'
  } finally {
    creatingExternalTarget.value = false
  }
}

async function removeExternalTarget(targetId: number) {
  addPending(deletingExternalTargetIds, targetId)
  errorBanner.value = null

  try {
    await deleteTarget(targetId)
    await Promise.all([reloadDetail(), loadLookups()])
  } catch (error) {
    errorBanner.value = error instanceof Error ? error.message : 'Externes Target konnte nicht entfernt werden'
  } finally {
    removePending(deletingExternalTargetIds, targetId)
  }
}

onMounted(loadPage)
</script>

<template>
  <div class="container detail-page">
    <div class="page-header">
      <GlowingBackButton icon="arrow_left_alt" class="btn-small" @click="closeEmailDetails" />
      <button class="ghost-button" :disabled="!detail?.email" @click="copyToClipboard(detail?.email ?? '')">
        Kopieren
      </button>
    </div>

    <div v-if="loadingPage" class="section">
      <p class="muted">Detailansicht wird geladen ...</p>
    </div>

    <template v-else-if="detail">
      <div class="section hero">
        <p class="eyebrow">E-Mail-Detail</p>
        <h2>{{ detail.email }}</h2>
        <div class="pill-row">
          <span class="pill" :class="{ active: detail.active }">{{ detail.active ? 'Aktiv' : 'Inaktiv' }}</span>
          <span class="pill" :class="{ active: detail.is_owner }">{{ detail.is_owner ? 'Owner' : 'Shared User' }}</span>
          <span class="pill" :class="{ active: detail.is_shared }">
            {{ detail.shared.length > 0 ? `${detail.shared.length} Shares` : 'Keine Shares' }}
          </span>
        </div>
        <p v-if="reloadingDetail" class="muted">Aktualisiere Daten ...</p>
      </div>

      <p v-if="errorBanner" class="error-banner">{{ errorBanner }}</p>

      <section class="section">
        <div class="section-title-row">
          <h3>Stammdaten</h3>
        </div>

        <label class="field">
          <span>Passwort</span>
          <input v-model="passwordDraft" type="text" placeholder="Passwort setzen oder leeren" />
        </label>
        <button class="primary-button" :disabled="savingPassword || !detail.is_owner" @click="savePassword">
          {{ savingPassword ? 'Speichert ...' : 'Passwort speichern' }}
        </button>

        <label class="field">
          <span>Kommentar</span>
          <textarea v-model="commentDraft" rows="4" placeholder="Kommentar zur E-Mail"></textarea>
        </label>
        <button class="primary-button" :disabled="savingComment || !detail.is_owner" @click="saveComment">
          {{ savingComment ? 'Speichert ...' : 'Kommentar speichern' }}
        </button>
      </section>

      <section class="section">
        <div class="section-title-row">
          <h3>Targets</h3>
          <span class="muted small">{{ currentUser?.caption || currentUser?.name || currentUser?.email }}</span>
        </div>

        <div class="target-list">
          <button
            v-for="target in normalizedKnownTargets"
            :key="target.id"
            class="target-toggle"
            :class="{ active: activeTargetIds.has(target.id) }"
            :disabled="mutatingTargetIds.includes(Number(target.id)) || !detail.active"
            @click="toggleKnownTarget(target.id)"
          >
            <span>{{ target.label }}</span>
            <small>{{ activeTargetIds.has(target.id) ? 'abonniert' : 'nicht abonniert' }}</small>
          </button>
          <p v-if="normalizedKnownTargets.length === 0" class="muted">Keine bekannten User-Targets gefunden.</p>
        </div>

        <div class="subsection">
          <h4>Externe Targets</h4>
          <div v-if="externalTargets.length > 0" class="stack-list">
            <div v-for="target in externalTargets" :key="target.id" class="list-card">
              <div>
                <strong>{{ target.label }}</strong>
                <p class="muted small">{{ target.address }}</p>
              </div>
              <button
                class="danger-button"
                :disabled="deletingExternalTargetIds.includes(target.id) || !detail.is_owner"
                @click="removeExternalTarget(target.id)"
              >
                Entfernen
              </button>
            </div>
          </div>
          <p v-else class="muted">Keine externen Targets an dieser E-Mail erkannt.</p>
        </div>

        <div class="subsection form-grid">
          <h4>Externes Target anlegen</h4>
          <label class="field">
            <span>E-Mail-Adresse</span>
            <input v-model="externalTargetAddress" type="email" placeholder="ziel@example.org" />
          </label>
          <label class="field">
            <span>Caption</span>
            <input v-model="externalTargetCaption" type="text" placeholder="optional" />
          </label>
          <button class="primary-button" :disabled="creatingExternalTarget || !detail.is_owner" @click="createExternalTarget">
            {{ creatingExternalTarget ? 'Legt an ...' : 'Externes Target speichern' }}
          </button>
        </div>
      </section>

      <section class="section">
        <div class="section-title-row">
          <h3>Shares</h3>
          <button
            v-if="detail.shared.length > 0"
            class="ghost-button"
            :disabled="!detail.is_owner"
            @click="makeExclusive"
          >
            Wieder exklusiv machen
          </button>
        </div>

        <div v-if="detail.shared.length > 0" class="stack-list">
          <div v-for="user in detail.shared" :key="user.id" class="list-card">
            <div>
              <strong>{{ user.caption || user.name || user.email }}</strong>
              <p class="muted small">{{ user.email }}</p>
            </div>
            <button
              class="danger-button"
              :disabled="mutatingShareUserIds.includes(user.id) || !detail.is_owner"
              @click="removeShare(user.id)"
            >
              Entfernen
            </button>
          </div>
        </div>
        <p v-else class="muted">Diese E-Mail ist aktuell nur fuer den Owner sichtbar.</p>

        <div class="subsection form-grid">
          <label class="field">
            <span>User freigeben</span>
            <select v-model="selectedShareUserId" :disabled="!detail.is_owner">
              <option :value="null">User auswaehlen</option>
              <option v-for="user in availableUsers" :key="user.id" :value="user.id">
                {{ user.caption || user.name || user.email }}
              </option>
            </select>
          </label>
          <button class="primary-button" :disabled="!selectedShareUserId || !detail.is_owner" @click="addShare">
            Share hinzufuegen
          </button>
        </div>
      </section>

      <section class="section">
        <div class="section-title-row">
          <h3>Spaces</h3>
        </div>

        <div v-if="detail.spaces.length > 0" class="stack-list">
          <div v-for="space in detail.spaces" :key="space.id" class="list-card">
            <div>
              <strong>{{ space.name }}</strong>
              <p v-if="space.users?.length" class="muted small">
                Mitglieder: {{ space.users.map((member) => member.caption || member.name || member.email).join(', ') }}
              </p>
              <p v-else class="muted small">Mitglieder laut Detail-Response nicht vorhanden.</p>
            </div>
            <button
              class="danger-button"
              :disabled="mutatingSpaceIds.includes(space.id) || !detail.is_owner"
              @click="unassignSpace(space.id)"
            >
              Entfernen
            </button>
          </div>
        </div>
        <p v-else class="muted">Diese E-Mail ist aktuell keinem Space zugewiesen.</p>

        <div class="subsection form-grid">
          <label class="field">
            <span>Space zuweisen</span>
            <select v-model="selectedSpaceId" :disabled="!detail.is_owner">
              <option :value="null">Space auswaehlen</option>
              <option v-for="space in availableSpaces" :key="space.id" :value="space.id">
                {{ space.name }}
              </option>
            </select>
          </label>
          <button class="primary-button" :disabled="!selectedSpaceId || !detail.is_owner" @click="assignSpace">
            Space zuweisen
          </button>
        </div>
      </section>
    </template>

    <div v-else class="section">
      <p class="error-banner">Kein Detaildatensatz gefunden.</p>
    </div>
  </div>
</template>

<style scoped>
.detail-page {
  width: 100%;
  max-width: 42rem;
  margin: 0 auto;
  padding: 1rem 1rem 4rem;
  box-sizing: border-box;
  align-items: stretch;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section {
  background: rgba(20, 25, 22, 0.8);
  border: 1px solid rgba(244, 68, 73, 0.28);
  box-shadow: 0 0 18px rgba(244, 68, 73, 0.1);
  border-radius: 18px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.hero h2 {
  margin: 0.2rem 0 0.75rem;
  word-break: break-word;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-secondary);
  font-size: 0.8rem;
}

.pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pill {
  border: 1px solid rgba(250, 220, 151, 0.3);
  color: var(--color-secondary);
  border-radius: 999px;
  padding: 0.35rem 0.7rem;
  font-size: 0.85rem;
}

.pill.active {
  background: rgba(250, 220, 151, 0.08);
}

.section-title-row {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.85rem;
}

.field span {
  color: var(--color-secondary);
  font-size: 0.92rem;
}

input,
textarea,
select {
  width: 100%;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
  min-height: 6rem;
  padding: 0.8rem 1rem;
  background-color: transparent;
  font-family: inherit;
  color: inherit;
  font-size: 1rem;
  border: 1px solid var(--color-primary);
  border-radius: 10px;
  caret-color: var(--color-primary-transparent);
}

.primary-button,
.danger-button,
.ghost-button {
  min-height: 2.75rem;
  border-radius: 12px;
  border: 1px solid transparent;
  font: inherit;
  padding: 0.7rem 1rem;
}

.primary-button {
  width: 100%;
  margin-bottom: 0.85rem;
  background: rgba(244, 68, 73, 0.12);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.danger-button {
  background: rgba(244, 68, 73, 0.08);
  border-color: rgba(244, 68, 73, 0.45);
  color: var(--color-primary);
}

.ghost-button {
  background: transparent;
  border-color: rgba(250, 220, 151, 0.35);
  color: var(--color-secondary);
}

button:disabled {
  opacity: 0.55;
}

.target-list,
.stack-list {
  display: grid;
  gap: 0.75rem;
}

.target-toggle,
.list-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(250, 220, 151, 0.2);
  background: rgba(250, 220, 151, 0.04);
  padding: 0.85rem 0.95rem;
  box-sizing: border-box;
  color: inherit;
  text-align: left;
}

.target-toggle {
  flex-direction: column;
  align-items: flex-start;
}

.target-toggle.active {
  border-color: var(--color-secondary);
  background: rgba(250, 220, 151, 0.12);
}

.subsection {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(250, 220, 151, 0.15);
}

.form-grid h4,
.subsection h4,
.section h3 {
  margin-top: 0;
}

.muted {
  color: rgba(255, 255, 255, 0.65);
}

.small {
  font-size: 0.86rem;
}

.error-banner {
  margin: 0 0 1rem;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  background: rgba(244, 68, 73, 0.14);
  border: 1px solid rgba(244, 68, 73, 0.35);
  color: #ffd7d7;
}

@media (min-width: 768px) {
  .detail-page {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .list-card {
    align-items: start;
  }
}
</style>
