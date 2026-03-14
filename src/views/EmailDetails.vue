<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { copyToClipboard } from '@/api/CopyToClipboard.ts'
import { getEmailDetails } from '@/api/emailDetails.api.ts'
import { getPreferences } from '@/api/preferences.api.ts'
import { addEmailShare, removeEmailShare } from '@/api/share.api.ts'
import { addEmailToSpace, getSpaces, removeEmailFromSpace } from '@/api/space.api.ts'
import { subscribe, unsubscribe } from '@/api/subscribe.api.ts'
import { createTarget, getTargets } from '@/api/target.api.ts'
import { updateEmail } from '@/api/updateEmail.api.ts'
import { getUser, getUserList } from '@/api/user.api.ts'
import { AppApiError, formatErrorForDisplay } from '@/api/httpError.ts'
import GlowingBackButton from '@/components/GlowingBackButton.vue'
import GlowingButtonBox from '@/components/GlowingButtonBox.vue'
import type { Email, EmailTarget } from '@/types/email.type.ts'
import type { EmailSharedUser, EmailSpace } from '@/types/email.type.ts'
import type { Preferences } from '@/types/preferences.type.ts'
import type { Space } from '@/types/space.type.ts'
import type { Target } from '@/types/target.type.ts'
import type { User } from '@/types/user.type.ts'
import { useEmailStore } from '@/stores/email.ts'

const router = useRouter()
const route = useRoute()
const emailStore = useEmailStore()

const detail = ref<Email | null>(null)
const preferences = ref<Preferences | null>(null)
const spaces = ref<Space[]>([])
const users = ref<User[]>([])
const knownTargets = ref<Target[]>([])
const currentUser = ref<User | null>(null)

const loadingPage = ref(true)
const reloadingDetail = ref(false)

const userErrorMessage = ref<string | null>(null)
const serverErrorDetail = ref<string | null>(null)
const showErrorDialog = ref(false)

const savingPassword = ref(false)
const savingComment = ref(false)
const togglingSubscribed = ref(false)

const mutatingSpaceIds = ref<number[]>([])
const mutatingShareUserIds = ref<number[]>([])
const mutatingTargetKeys = ref<string[]>([])

const passwordDraft = ref('')
const commentDraft = ref('')
const selectedKnownTargetAddress = ref('')
const freeTargetAddress = ref('')
const showFreeTargetDialog = ref(false)
const showSharedUsersDialog = ref(false)
const showSpacesDialog = ref(false)
const showPasswordValue = ref(false)
const showCommentEditor = ref(false)
const showPasswordEditor = ref(false)
const commentTextarea = ref<HTMLTextAreaElement | null>(null)

const emailId = computed(() => Number(route.params.id ?? emailStore.id ?? 0))

function normalizeKey(value: string | null | undefined) {
  return value?.trim().toLowerCase() ?? ''
}

function getTargetAddress(target: EmailTarget | Target) {
  return target.address || target.email || ''
}

function getTargetUserId(target: EmailTarget | Target) {
  return typeof target.user_id === 'number' ? target.user_id : null
}

function getUserLabel(user: User | null | undefined) {
  if (!user) return ''
  return user.caption || user.name || user.email
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}

function normalizeDetail(email: Email): Email {
  return {
    ...email,
    password: email.password ?? null,
    comment: email.comment ?? '',
    targets: asArray<EmailTarget>(email.targets),
    shared: asArray(email.shared),
    spaces: asArray(email.spaces),
  }
}

function addPending(list: Ref<number[]>, id: number | string) {
  list.value = [...list.value, Number(id)]
}

function removePending(list: Ref<number[]>, id: number | string) {
  list.value = list.value.filter((entry) => entry !== Number(id))
}

function addTargetPending(targetKey: string) {
  mutatingTargetKeys.value = [...mutatingTargetKeys.value, targetKey]
}

function removeTargetPending(targetKey: string) {
  mutatingTargetKeys.value = mutatingTargetKeys.value.filter((entry) => entry !== targetKey)
}

function isTargetPending(targetKey: string) {
  return mutatingTargetKeys.value.includes(targetKey)
}

const ownKnownTarget = computed(() => {
  if (!currentUser.value) return null
  return knownTargets.value.find((target) => target.user_id === currentUser.value?.id) ?? null
})

function isOwnTarget(target: EmailTarget | Target) {
  const address = normalizeKey(getTargetAddress(target))
  const ownAddress = normalizeKey(currentUser.value?.email)

  if (ownKnownTarget.value && target.id === ownKnownTarget.value.id) {
    return true
  }

  return !!ownAddress && address === ownAddress
}

const currentExtraTargetKeys = computed(
  () =>
    new Set(
      (detail.value?.targets ?? [])
        .filter((target) => !isOwnTarget(target))
        .map((target) => normalizeKey(getTargetAddress(target)))
        .filter(Boolean),
    ),
)

const availableKnownTargets = computed(() =>
  knownTargets.value
    .filter((target) => {
      const address = getTargetAddress(target)
      if (!address) return false
      if (isOwnTarget(target)) return false
      return !currentExtraTargetKeys.value.has(normalizeKey(address))
    })
    .map((target) => {
      const targetUser =
        typeof target.user_id === 'number'
          ? (users.value.find((user) => user.id === target.user_id) ?? null)
          : null

      return {
        value: getTargetAddress(target),
        label: getUserLabel(targetUser) || getTargetAddress(target),
      }
    }),
)

const extraTargets = computed(() =>
  asArray<EmailTarget>(detail.value?.targets)
    .filter((target) => !isOwnTarget(target))
    .map((target) => ({
      id: target.id,
      address: getTargetAddress(target),
    }))
    .filter((target) => !!target.address),
)
const hasExtraTargets = computed(() => extraTargets.value.length > 0)
const ownEmailTargets = computed(() =>
  asArray<EmailTarget>(detail.value?.targets).filter(
    (target) => getTargetUserId(target) === currentUser.value?.id,
  ),
)

const subscribed = computed(() => !!detail.value?.has_target)
const showSubscribedControl = computed(() => {
  if (!detail.value) return false
  if (!detail.value.is_owner) return !!detail.value.is_shared
  return asArray<EmailTarget>(detail.value.targets).length === 0
})
const canManageOwnerFeatures = computed(() => !!detail.value?.is_owner)
const canViewPassword = computed(
  () => !!detail.value && (detail.value.is_owner || detail.value.in_space),
)
const canEditPassword = computed(() => !!detail.value?.is_owner)
const canViewComment = computed(() => !!detail.value)
const canEditComment = computed(() => !!detail.value?.is_owner)
const sharedForOthers = computed(() =>
  detail.value?.is_owner ? asArray(detail.value.shared).length > 0 : !!detail.value?.is_shared,
)
const inSpace = computed(() =>
  detail.value?.is_owner ? asArray(detail.value.spaces).length > 0 : !!detail.value?.in_space,
)
const showPassword = computed(
  () => !!preferences.value?.use_passwords || !!preferences.value?.use_password_system,
)
const freeTargetValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(freeTargetAddress.value.trim()),
)
const hasPassword = computed(() => !!detail.value?.password?.trim() || !!passwordDraft.value.trim())
const hasComment = computed(() => !!detail.value?.comment?.trim() || !!commentDraft.value.trim())
const showPasswordSection = computed(() => hasPassword.value || showPasswordEditor.value)
const showCommentSection = computed(() => hasComment.value || showCommentEditor.value)
const passwordChanged = computed(() => passwordDraft.value !== (detail.value?.password ?? ''))
const commentChanged = computed(() => commentDraft.value !== (detail.value?.comment ?? ''))
const canSavePassword = computed(() => canEditPassword.value && passwordChanged.value)
const canSaveComment = computed(() => canEditComment.value && commentChanged.value)
const canAddKnownTarget = computed(() => !!selectedKnownTargetAddress.value)

const sharedUsers = computed(() =>
  users.value
    .filter((user) => user.id !== currentUser.value?.id)
    .map((user) => ({
      id: user.id,
      label: getUserLabel(user),
      active: asArray<EmailSharedUser>(detail.value?.shared).some((sharedUser) => sharedUser.id === user.id),
    })),
)

const spaceEntries = computed(() =>
  spaces.value.map((space) => ({
    id: space.id,
    label: space.name,
    active: asArray<EmailSpace>(detail.value?.spaces).some((assignedSpace) => assignedSpace.id === space.id),
  })),
)

function clearError() {
  userErrorMessage.value = null
  serverErrorDetail.value = null
  showErrorDialog.value = false
}

function handleError(error: unknown, fallbackUserMessage: string) {
  const normalized = formatErrorForDisplay(error, fallbackUserMessage)
  userErrorMessage.value = normalized.userMessage
  serverErrorDetail.value = normalized.serverDetail
}

function setDrafts(email: Email) {
  passwordDraft.value = email.password ?? ''
  commentDraft.value = email.comment ?? ''
  showPasswordEditor.value = !!email.password?.trim()
  showCommentEditor.value = !!email.comment?.trim()
  void nextTick(syncCommentHeight)
}

function syncCommentHeight() {
  if (!commentTextarea.value) return
  commentTextarea.value.style.height = 'auto'
  commentTextarea.value.style.height = `${commentTextarea.value.scrollHeight}px`
}

async function ensureFreeTargetExists(address: string): Promise<void> {
  const normalizedAddress = normalizeKey(address)
  const existingTarget =
    knownTargets.value.find(
      (target) => normalizeKey(getTargetAddress(target)) === normalizedAddress,
    ) ?? null

  if (existingTarget) return

  try {
    await createTarget({ address })
    knownTargets.value = await getTargets()
  } catch (error) {
    if (
      error instanceof AppApiError &&
      error.status === 400 &&
      error.serverMessage &&
      /already exists|existiert bereits/i.test(error.serverMessage)
    ) {
      knownTargets.value = await getTargets()
      const knownTarget =
        knownTargets.value.find(
          (target) => normalizeKey(getTargetAddress(target)) === normalizedAddress,
        ) ?? null

      if (knownTarget) return
    }

    throw error
  }
}

async function loadLookups() {
  const [preferencesData, detailData, ownUser] = await Promise.all([
    getPreferences(),
    getEmailDetails(emailId.value),
    getUser(),
  ])

  preferences.value = preferencesData
  detail.value = normalizeDetail(detailData)
  currentUser.value = ownUser
  setDrafts(detail.value)

  if (!detail.value.is_owner) {
    spaces.value = []
    users.value = []
    knownTargets.value = []
    return
  }

  const [spaceList, userList, targetList] = await Promise.all([
    getSpaces(),
    getUserList(),
    getTargets(),
  ])

  spaces.value = spaceList
  users.value = userList
  knownTargets.value = targetList
}

async function reloadDetail() {
  reloadingDetail.value = true

  try {
    const nextDetail = await getEmailDetails(emailId.value)
    detail.value = normalizeDetail(nextDetail)
    setDrafts(detail.value)
  } finally {
    reloadingDetail.value = false
  }
}

async function loadPage() {
  loadingPage.value = true
  clearError()

  try {
    await loadLookups()
  } catch (error) {
    handleError(error, 'Detailansicht konnte nicht geladen werden.')
  } finally {
    loadingPage.value = false
  }
}

async function toggleSubscribed() {
  if (!detail.value) return

  togglingSubscribed.value = true
  clearError()

  try {
    if (subscribed.value) {
      if (ownEmailTargets.value.length > 0) {
        await Promise.all(
          ownEmailTargets.value.map((target) => {
            const targetKey = getTargetAddress(target) || target.id
            return unsubscribe(detail.value!.email_id, targetKey)
          }),
        )
      } else {
        await unsubscribe(detail.value.email_id)
      }
    } else {
      await subscribe(detail.value.email_id)
    }

    await reloadDetail()
  } catch (error) {
    handleError(error, 'Abo-Status konnte nicht geaendert werden.')
  } finally {
    togglingSubscribed.value = false
  }
}

async function savePassword() {
  if (!detail.value) return

  savingPassword.value = true
  clearError()

  try {
    await updateEmail({
      id: detail.value.email_id,
      password: passwordDraft.value || null,
      comment: detail.value.comment ?? '',
    })
    await reloadDetail()
  } catch (error) {
    handleError(error, 'Passwort konnte nicht gespeichert werden.')
  } finally {
    savingPassword.value = false
  }
}

async function saveComment() {
  if (!detail.value) return

  savingComment.value = true
  clearError()

  try {
    await updateEmail({
      id: detail.value.email_id,
      password: detail.value.password ?? null,
      comment: commentDraft.value,
    })
    await reloadDetail()
  } catch (error) {
    handleError(error, 'Kommentar konnte nicht gespeichert werden.')
  } finally {
    savingComment.value = false
  }
}

async function addTarget() {
  if (!detail.value || !selectedKnownTargetAddress.value) return
  const targetAddress = selectedKnownTargetAddress.value

  addTargetPending(targetAddress)
  clearError()

  try {
    await subscribe(detail.value.email_id, targetAddress)
    selectedKnownTargetAddress.value = ''
    await reloadDetail()
  } catch (error) {
    handleError(error, 'Target konnte nicht hinzugefuegt werden.')
  } finally {
    removeTargetPending(targetAddress)
  }
}

async function addFreeTarget() {
  if (!detail.value || !freeTargetValid.value) return
  const targetAddress = freeTargetAddress.value.trim()

  addTargetPending(targetAddress)
  clearError()

  try {
    await ensureFreeTargetExists(targetAddress)
    await subscribe(detail.value.email_id, targetAddress)
    freeTargetAddress.value = ''
    showFreeTargetDialog.value = false
    await reloadDetail()
  } catch (error) {
    handleError(error, 'Freies Target konnte nicht hinzugefuegt werden.')
  } finally {
    removeTargetPending(targetAddress)
  }
}

async function removeTarget(targetAddress: string) {
  if (!detail.value) return

  addTargetPending(targetAddress)
  clearError()

  try {
    await unsubscribe(detail.value.email_id, targetAddress)
    await reloadDetail()
  } catch (error) {
    handleError(error, 'Target konnte nicht entfernt werden.')
  } finally {
    removeTargetPending(targetAddress)
  }
}

async function toggleShare(userId: number, active: boolean) {
  if (!detail.value) return

  addPending(mutatingShareUserIds, userId)
  clearError()

  try {
    if (active) {
      await removeEmailShare(detail.value.email_id, userId)
    } else {
      await addEmailShare(detail.value.email_id, userId)
    }
    await reloadDetail()
  } catch (error) {
    handleError(error, 'Freigabe konnte nicht geaendert werden.')
  } finally {
    removePending(mutatingShareUserIds, userId)
  }
}

async function toggleSpace(spaceId: number, active: boolean) {
  if (!detail.value) return

  addPending(mutatingSpaceIds, spaceId)
  clearError()

  try {
    if (active) {
      await removeEmailFromSpace(detail.value.email_id, spaceId)
    } else {
      await addEmailToSpace(detail.value.email_id, spaceId)
    }
    await reloadDetail()
  } catch (error) {
    handleError(error, 'Space-Zuweisung konnte nicht geaendert werden.')
  } finally {
    removePending(mutatingSpaceIds, spaceId)
  }
}

function closeEmailDetails() {
  emailStore.clearID(emailId.value)
  router.push('/')
}

function statusComponent(active: boolean) {
  return active ? GlowingButtonBox : GlowingBackButton
}

onMounted(loadPage)

watch(commentDraft, () => {
  void nextTick(syncCommentHeight)
})

watch(showCommentSection, (visible) => {
  if (!visible) return
  void nextTick(syncCommentHeight)
})
</script>

<template>
  <div class="container detail-page">
    <div class="page-header">
      <GlowingBackButton icon="arrow_left_alt" class="btn-small" @click="closeEmailDetails" />
      <GlowingButtonBox
        class="compact-copy-button very-small"
        icon="content_copy"
        :name="''"
        :disabled="!detail?.email"
        @click="copyToClipboard(detail?.email ?? '')"
      />
    </div>

    <div v-if="loadingPage" class="section">
      <p class="muted">Detailansicht wird geladen ...</p>
    </div>

    <template v-else-if="detail">
      <section class="section hero">
        <h3>{{ detail.email }}</h3>
        <p v-if="reloadingDetail" class="muted">Aktualisiere Daten ...</p>
      </section>

      <div v-if="userErrorMessage" class="error-banner">
        <p>{{ userErrorMessage }}</p>
        <button
          v-if="serverErrorDetail"
          class="ghost-button compact-button"
          @click="showErrorDialog = true"
        >
          Technische Details
        </button>
      </div>

      <section class="section">
        <div class="status-grid">
          <component
            :is="statusComponent(subscribed)"
            v-if="showSubscribedControl"
            class="status-action"
            :icon="subscribed ? 'notifications' : 'notifications_off'"
            :name="''"
            :disabled="togglingSubscribed"
            @click="toggleSubscribed"
          />

          <component
            v-if="canManageOwnerFeatures"
            :is="statusComponent(sharedForOthers)"
            class="status-action"
            :icon="sharedForOthers ? 'groups' : 'group_off'"
            :name="''"
            @click="showSharedUsersDialog = true"
          />

          <component
            v-if="canManageOwnerFeatures"
            :is="statusComponent(inSpace)"
            class="status-action"
            :icon="inSpace ? 'visibility' : 'visibility_off'"
            :name="''"
            @click="showSpacesDialog = true"
          />
        </div>
      </section>

      <section
        v-if="showPassword && canViewPassword && (showPasswordSection || canEditPassword)"
        class="section"
      >
        <div class="section-title-row">
          <h3>Passwort</h3>
          <GlowingButtonBox
            v-if="canEditPassword && !showPasswordSection"
            class="header-action-button btn-small"
            icon="add"
            :name="''"
            @click="showPasswordEditor = true"
          />
          <GlowingButtonBox
            v-else-if="canSavePassword"
            class="header-action-button btn-small"
            icon="save"
            :name="''"
            :disabled="savingPassword"
            @click="savePassword"
          />
        </div>

        <label v-if="showPasswordSection" class="field">
          <div class="field-inline-row">
            <input
              v-model="passwordDraft"
              :type="showPasswordValue ? 'text' : 'password'"
              name="email_password_note"
              placeholder="Passwort setzen oder leeren"
              autocomplete="off"
              autocapitalize="off"
              autocorrect="off"
              spellcheck="false"
              data-lpignore="true"
              data-1p-ignore="true"
              :readonly="!canEditPassword"
            />
            <GlowingBackButton
              class="header-action-button visibility-toggle-button very-small"
              :icon="showPasswordValue ? 'visibility_off' : 'visibility'"
              :name="''"
              @click="showPasswordValue = !showPasswordValue"
            />
          </div>
        </label>
      </section>

      <section v-if="canViewComment && (showCommentSection || canEditComment)" class="section">
        <div class="section-title-row">
          <h3>Kommentar</h3>
          <GlowingButtonBox
            v-if="canEditComment && !showCommentSection"
            class="header-action-button btn-small"
            icon="add"
            :name="''"
            @click="showCommentEditor = true"
          />
          <GlowingButtonBox
            v-else-if="canSaveComment"
            class="header-action-button btn-small"
            icon="save"
            :name="''"
            :disabled="savingComment"
            @click="saveComment"
          />
        </div>

        <label v-if="showCommentSection" class="field">
          <textarea
            ref="commentTextarea"
            v-model="commentDraft"
            class="comment-textarea"
            name="email_comment_note"
            rows="1"
            placeholder="Kommentar zur E-Mail"
            autocomplete="off"
            autocapitalize="off"
            autocorrect="off"
            spellcheck="false"
            data-lpignore="true"
            data-1p-ignore="true"
            :readonly="!canEditComment"
          ></textarea>
        </label>
      </section>

      <section v-if="canManageOwnerFeatures" class="section">
        <div v-if="hasExtraTargets" class="section-title-row">
          <h3>Weiterleitungen</h3>
        </div>

        <div v-if="hasExtraTargets" class="stack-list">
          <div v-for="target in extraTargets" :key="target.address" class="list-card">
            <strong>{{ target.address }}</strong>
            <GlowingBackButton
              class="compact-icon-button btn-small"
              :disabled="isTargetPending(target.address)"
              icon="delete"
              :name="''"
              @click="removeTarget(target.address)"
            />
          </div>
        </div>

        <div class="subsection">
          <div class="section-title-row subsection-title-row">
            <h3>Target hinzufuegen</h3>
            <GlowingButtonBox
              v-if="canAddKnownTarget"
              class="header-action-button btn-small"
              icon="save"
              :name="''"
              @click="addTarget"
            />
          </div>

          <label class="field">
            <select v-model="selectedKnownTargetAddress">
              <option value="">Target auswaehlen</option>
              <option
                v-for="target in availableKnownTargets"
                :key="target.value"
                :value="target.value"
              >
                {{ target.label }}
              </option>
            </select>
          </label>
          <div class="subsection-actions centered">
            <GlowingButtonBox
              class="header-action-button very-small"
              icon="add"
              :name="''"
              @click="showFreeTargetDialog = true"
            />
          </div>
        </div>
      </section>
    </template>

    <div v-else class="section">
      <p class="error-banner">Kein Detaildatensatz gefunden.</p>
    </div>

    <div
      v-if="showErrorDialog && serverErrorDetail"
      class="modal-backdrop"
      @click.self="showErrorDialog = false"
    >
      <div class="modal-panel">
        <h4>Server-Fehlermeldung</h4>
        <pre>{{ serverErrorDetail }}</pre>
        <button class="primary-button" @click="showErrorDialog = false">Schliessen</button>
      </div>
    </div>

    <div
      v-if="showFreeTargetDialog"
      class="modal-backdrop"
      @click.self="showFreeTargetDialog = false"
    >
      <div class="modal-panel">
        <h4>Freies Target</h4>
        <label class="field">
          <span>E-Mail-Adresse</span>
          <input
            v-model="freeTargetAddress"
            type="email"
            name="free_target_email"
            placeholder="ziel@example.org"
            autocomplete="off"
            autocapitalize="off"
            autocorrect="off"
            spellcheck="false"
            data-lpignore="true"
            data-1p-ignore="true"
          />
        </label>
        <p v-if="freeTargetAddress.trim() && !freeTargetValid" class="input-error">
          Bitte eine gültige E-Mail-Adresse eingeben.
        </p>
        <div class="dialog-actions">
          <GlowingBackButton
            class="header-action-button btn-small"
            icon="arrow_left_alt"
            :name="''"
            @click="showFreeTargetDialog = false"
          />
          <GlowingButtonBox
            class="header-action-button btn-small"
            icon="save"
            :name="''"
            :disabled="!freeTargetValid"
            @click="addFreeTarget"
          />
        </div>
      </div>
    </div>

    <div
      v-if="detail?.is_owner && showSharedUsersDialog"
      class="modal-backdrop"
      @click.self="showSharedUsersDialog = false"
    >
      <div class="modal-panel">
        <h4 class="dialog-title">Für andere freigeben</h4>
        <div class="stack-list">
          <div v-for="user in sharedUsers" :key="user.id" class="list-card">
            <strong>{{ user.label }}</strong>
            <component
              :is="statusComponent(user.active)"
              class="compact-icon-button compact-toggle-button very-small"
              :icon="user.active ? 'groups' : 'group_off'"
              :name="''"
              :disabled="mutatingShareUserIds.includes(user.id)"
              @click="toggleShare(user.id, user.active)"
            />
          </div>
        </div>
        <div class="dialog-actions centered">
          <GlowingBackButton
            class="header-action-button btn-small"
            icon="arrow_left_alt"
            :name="''"
            @click="showSharedUsersDialog = false"
          />
        </div>
      </div>
    </div>

    <div
      v-if="detail?.is_owner && showSpacesDialog"
      class="modal-backdrop"
      @click.self="showSpacesDialog = false"
    >
      <div class="modal-panel">
        <h4 class="dialog-title">Für Gruppe bereitstellen</h4>
        <div class="stack-list">
          <div v-for="space in spaceEntries" :key="space.id" class="list-card">
            <strong>{{ space.label }}</strong>
            <component
              :is="statusComponent(space.active)"
              class="compact-icon-button compact-toggle-button very-small"
              :icon="space.active ? 'visibility' : 'visibility_off'"
              :name="''"
              :disabled="mutatingSpaceIds.includes(space.id)"
              @click="toggleSpace(space.id, space.active)"
            />
          </div>
        </div>
        <div class="dialog-actions centered">
          <GlowingBackButton
            class="header-action-button btn-small"
            icon="arrow_left_alt"
            :name="''"
            @click="showSpacesDialog = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.very-small {
  width: 70px;
}

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
  position: relative;
  padding: 1rem 0;
  margin-bottom: 0;
  min-width: 0;
}

.hero {
  text-align: center;
}

.eyebrow {
  margin: 0 0 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
}

.hero h2,
.section h3,
.modal-panel h4 {
  margin-top: 0;
}

.section-title-row {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.section-actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.dialog-title {
  text-align: center;
}

.status-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 0.75rem;
}

.status-card {
  background: var(--color-background);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  min-height: 7.5rem;
  padding: 0.9rem 0.65rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.65rem;
  text-align: center;
}

.status-title,
.field span {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.92rem;
}

.status-action {
  flex: 1 1 8.5rem;
  max-width: 12rem;
}

.status-action:deep(.btn) {
  width: 100%;
  min-height: 4.1rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.compact-copy-button:deep(.btn) {
  width: 2.75rem;
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.compact-copy-button:deep(.material-symbols-rounded) {
  font-size: 1.35rem;
}

.header-action-button:deep(.btn) {
  width: 2.75rem;
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.header-action-button:deep(.material-symbols-rounded) {
  font-size: 1.35rem;
}

.visibility-toggle-button:deep(.btn) {
  width: 2.75rem;
  min-width: 2.75rem;
}

.status-action:deep(.material-symbols-rounded) {
  font-size: 2rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.7rem;
  min-width: 0;
}

input,
textarea,
select {
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
}

textarea {
  resize: vertical;
  min-height: 6rem;
  padding: 0.8rem 1rem;
  background-color: var(--color-background-secondary);
  font-family: inherit;
  color: var(--color-secondary);
  font-size: 1rem;
  border: 1px solid var(--color-secondary);
  border-radius: 5px;
  caret-color: var(--color-secondary);
}

input[readonly],
textarea[readonly] {
  opacity: 0.82;
}

.primary-button,
.danger-button,
.ghost-button {
  min-height: 2.75rem;
  border-radius: 5px;
  border: 1px solid transparent;
  font: inherit;
  padding: 0.7rem 1rem;
  background: var(--color-background);
}

.primary-button {
  width: 100%;
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.danger-button {
  border-color: rgba(244, 68, 73, 0.45);
  color: var(--color-primary);
}

.ghost-button {
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
}

.ghost-button.active {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.compact-button {
  width: auto;
  min-height: 2.4rem;
  padding: 0.45rem 0.75rem;
}

.icon-button {
  width: 2.4rem;
  min-width: 2.4rem;
  min-height: 2.4rem;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  line-height: 1;
}

.compact-icon-button:deep(.btn) {
  width: 2.6rem;
  min-width: 2.6rem;
  min-height: 2.6rem;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.compact-icon-button:deep(.material-symbols-rounded) {
  font-size: 1.35rem;
}

.compact-toggle-button:deep(.btn) {
  width: 2.1rem;
  min-width: 2.1rem;
  max-width: 20%;
}

button:not(:disabled) {
  cursor: pointer;
}

button:disabled {
  opacity: 0.55;
}

.stack-list {
  display: grid;
  gap: 0.75rem;
  min-width: 0;
}

.list-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  background: var(--color-background);
  border-radius: 5px;
  box-sizing: border-box;
  color: inherit;
  text-align: left;
  min-width: 0;
}

.modal-panel .list-card {
  justify-content: space-between;
}

.list-card strong {
  min-width: 0;
  overflow-wrap: anywhere;
}

.subsection-title-row {
  margin-bottom: 0.5rem;
}

.subsection-actions,
.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
}

.subsection-actions.centered {
  justify-content: center;
  margin-top: 0.85rem;
}

.dialog-actions.centered {
  justify-content: center;
}

.field-inline-row {
  display: flex;
  align-items: stretch;
  gap: 0.6rem;
}

.field-inline-row input {
  flex: 1 1 auto;
  min-width: 0;
}

.comment-textarea {
  min-height: 0;
  overflow-y: hidden;
}

.input-error {
  margin: 0 0 0.85rem;
  color: #f4c542;
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
  background: var(--color-background);
  border-radius: 5px;
  border: 1px solid rgba(244, 68, 73, 0.35);
}

.error-banner p {
  margin: 0;
  color: var(--color-secondary);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.62);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 100;
  cursor: pointer;
  box-sizing: border-box;
  overflow-x: hidden;
}

.modal-panel {
  width: min(760px, calc(100vw - 2rem));
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 2rem);
  overflow-x: hidden;
  overflow-y: auto;
  background: var(--color-background);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  padding: 1rem;
  cursor: default;
  box-sizing: border-box;
  min-width: 0;
}

.modal-panel pre {
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
  background: var(--color-background);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  padding: 0.75rem;
  margin-bottom: 0.8rem;
  max-width: 100%;
  box-sizing: border-box;
}

@media (max-width: 640px) {
  .detail-page {
    padding: 0.75rem 0.75rem 2rem;
  }

  .page-header {
    padding: 0.35rem 0 0.75rem;
  }

  .section {
    padding: 0.85rem 0;
  }

  .status-grid {
    gap: 0.55rem;
  }

  .status-action {
    flex-basis: calc(50% - 0.55rem);
    max-width: none;
  }

  .status-title {
    font-size: 0.82rem;
  }

  .list-card {
    padding: 0.75rem 0.8rem;
  }

  .modal-panel {
    width: calc(100vw - 1rem);
    max-width: calc(100vw - 1rem);
    max-height: calc(100vh - 2rem);
    padding: 0.9rem;
  }
}
</style>
