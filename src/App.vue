<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { draftActionKey } from './draft/context'
import DraftHeader from './draft/DraftHeader.vue'
import LandingPage from './draft/LandingPage.vue'
import PreipoDetailPage from './draft/PreipoDetailPage.vue'
import { detailCompanies } from './draft/preipoDetailData'

const readCompany = () => {
  const id = new URLSearchParams(location.search).get('company')
  return detailCompanies.some(company => company.id === id) ? id : ''
}
const selectedCompanyId = ref(readCompany())
const selectedCompany = computed(() => detailCompanies.find(company => company.id === selectedCompanyId.value))
const notice = ref('')
let noticeTimeout
let navigationVersion = 0
let pendingCatalogReturn = null
const originalScrollRestoration = history.scrollRestoration
history.scrollRestoration = 'manual'

provide(draftActionKey, (description) => {
  notice.value = description + ' — подключим позже. В макете действие не выполняется.'
  clearTimeout(noticeTimeout)
  noticeTimeout = setTimeout(() => { notice.value = '' }, 3500)
})

function homeHref(hash = location.hash) {
  const url = new URL(location.href)
  url.searchParams.delete('company')
  url.hash = hash
  return url.pathname + url.search + url.hash
}

function catalogHref() {
  return homeHref(history.state?.preipoReturn ? location.hash : '#companies')
}

function detailHistoryDepth() {
  const depth = history.state?.preipoDetailDepth
  return Number.isSafeInteger(depth) && depth > 0 ? depth : 0
}

// The landing's mount hooks measure the scene first. Restore before paint and
// synchronously sample the final position, without a scroll tween or replay.
async function restoreView(target = {}) {
  const version = ++navigationVersion
  await nextTick()
  if (version !== navigationVersion) return
  if (selectedCompanyId.value) {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.getElementById('preipo-title')?.focus({ preventScroll: true })
    return
  }
  if (Number.isFinite(target.scrollY)) {
    window.scrollTo({ top: target.scrollY, behavior: 'instant' })
  } else {
    const id = (target.hash || location.hash || '#companies').slice(1)
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
  }
  window.dispatchEvent(new Event('resize'))
  const focus = target.focusCompanyId
    ? [...document.querySelectorAll('[data-company-id]')].find(link => link.dataset.companyId === target.focusCompanyId)
    : document.getElementById((target.hash || location.hash || '#companies').slice(1))
  if (focus) {
    if (!focus.matches('a, button, input')) focus.setAttribute('tabindex', '-1')
    focus.focus({ preventScroll: true })
  }
}

function openCompany(id, href) {
  if (pendingCatalogReturn) return
  const depth = selectedCompanyId.value ? detailHistoryDepth() + 1 : 1
  let returnTarget = history.state?.preipoReturn
  if (!selectedCompanyId.value) {
    returnTarget = { scrollY: window.scrollY, focusCompanyId: id }
    history.replaceState({ ...history.state, preipoLanding: returnTarget }, '', location.href)
  }
  history.pushState({ preipoReturn: returnTarget, preipoDetailDepth: depth }, '', href)
  selectedCompanyId.value = id
  restoreView()
}

function returnToCatalog(event) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  if (pendingCatalogReturn) return
  const target = history.state?.preipoReturn || { hash: '#companies' }
  const depth = detailHistoryDepth()
  if (depth) {
    // Skip the whole detail chain. Its original entry survives reloads because
    // each pushed detail records its distance from that entry in history.state.
    pendingCatalogReturn = { target, href: catalogHref() }
    history.go(-depth)
    return
  }
  // A direct link has no catalog entry to return to; replace it instead.
  history.replaceState({ ...history.state, preipoReturn: null, preipoDetailDepth: 0, preipoLanding: target }, '', catalogHref())
  selectedCompanyId.value = ''
  restoreView(target)
}

function handleClick(event) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const link = event.target.closest?.('a')
  if (!link || link.target || link.hasAttribute('download')) return
  const url = new URL(link.href, location.href)
  if (url.origin !== location.origin || url.pathname !== location.pathname) return
  const id = url.searchParams.get('company')
  if (detailCompanies.some(company => company.id === id) && link.hasAttribute('data-company-id')) {
    event.preventDefault()
    openCompany(id, url.pathname + url.search + url.hash)
  } else if (selectedCompanyId.value && link.closest('.draft-header') && link.getAttribute('href')?.startsWith('#')) {
    event.preventDefault()
    if (pendingCatalogReturn) return
    const target = { hash: url.hash }
    history.pushState({ preipoLanding: target }, '', homeHref(url.hash))
    selectedCompanyId.value = ''
    restoreView(target)
  }
}

function handlePopState() {
  const catalogReturn = pendingCatalogReturn
  pendingCatalogReturn = null
  if (catalogReturn && readCompany()) {
    // A chain started at a direct link: turn its first detail entry into the
    // catalog, keeping later company entries available through browser Forward.
    history.replaceState({ ...history.state, preipoReturn: null, preipoDetailDepth: 0, preipoLanding: catalogReturn.target }, '', catalogReturn.href)
  }
  selectedCompanyId.value = readCompany()
  restoreView(catalogReturn?.target || history.state?.preipoLanding || { hash: location.hash || '#companies' })
}

onMounted(() => {
  document.addEventListener('click', handleClick)
  window.addEventListener('popstate', handlePopState)
  if (selectedCompanyId.value) restoreView()
  else if (history.state?.preipoLanding || location.hash) restoreView(history.state?.preipoLanding || { hash: location.hash })
})
onBeforeUnmount(() => {
  clearTimeout(noticeTimeout)
  navigationVersion++
  history.scrollRestoration = originalScrollRestoration
  document.removeEventListener('click', handleClick)
  window.removeEventListener('popstate', handlePopState)
})
</script>

<template>
  <DraftHeader />
  <LandingPage v-if="!selectedCompanyId" />
  <PreipoDetailPage v-else :key="selectedCompanyId" :company="selectedCompany" :back-href="catalogHref()" @back="returnToCatalog" />
  <div v-if="notice" class="draft-notice" role="status" aria-live="polite">
    <span class="draft-notice-dot"></span>{{ notice }}
    <button type="button" aria-label="Закрыть уведомление" @click="notice = ''">×</button>
  </div>
</template>
