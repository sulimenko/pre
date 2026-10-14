<script setup>
import { onBeforeUnmount, provide, ref } from 'vue'
import { draftActionKey } from './draft/context'
import DraftHeader from './draft/DraftHeader.vue'
import HeroBlock from './draft/HeroBlock.vue'
import CompaniesBlock from './draft/CompaniesBlock.vue'
import WhyBlock from './draft/WhyBlock.vue'
import TerminalBlock from './draft/TerminalBlock.vue'
import MarketBlock from './draft/MarketBlock.vue'
import ProcessBlock from './draft/ProcessBlock.vue'
import TrustBlock from './draft/TrustBlock.vue'
import VideosBlock from './draft/VideosBlock.vue'
import FaqBlock from './draft/FaqBlock.vue'
import CtaBlock from './draft/CtaBlock.vue'

const notice = ref('')
let noticeTimeout

provide(draftActionKey, (description) => {
  notice.value = description + ' — подключим на следующем этапе'
  clearTimeout(noticeTimeout)
  noticeTimeout = setTimeout(() => { notice.value = '' }, 3500)
})
onBeforeUnmount(() => clearTimeout(noticeTimeout))
</script>

<template>
  <DraftHeader />
  <main>
    <HeroBlock />
    <CompaniesBlock />
    <WhyBlock />
    <TerminalBlock />
    <MarketBlock />
    <ProcessBlock />
    <TrustBlock />
    <VideosBlock />
    <FaqBlock />
    <CtaBlock />
  </main>
  <div v-if="notice" class="draft-notice" role="status" aria-live="polite">
    <span class="draft-notice-dot"></span>{{ notice }}
    <button type="button" aria-label="Закрыть уведомление" @click="notice = ''">×</button>
  </div>
</template>
