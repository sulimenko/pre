<script setup>
import { ref } from 'vue'
import HeroBlock from './HeroBlock.vue'
import CompaniesBlock from './CompaniesBlock.vue'
import WhyBlock from './WhyBlock.vue'
import TerminalBlock from './TerminalBlock.vue'
import MarketBlock from './MarketBlock.vue'
import ProcessBlock from './ProcessBlock.vue'
import TrustBlock from './TrustBlock.vue'
import VideosBlock from './VideosBlock.vue'
import FaqBlock from './FaqBlock.vue'
import CtaBlock from './CtaBlock.vue'
import { useHeroScrollProgress } from './useHeroScrollProgress'

const heroScene = ref(null)
useHeroScrollProgress(heroScene)
</script>

<template>
  <main>
    <div ref="heroScene" class="hero-companies-scene">
      <HeroBlock />
      <CompaniesBlock />
    </div>
    <WhyBlock />
    <TerminalBlock />
    <MarketBlock />
    <ProcessBlock />
    <TrustBlock />
    <VideosBlock />
    <FaqBlock />
    <CtaBlock />
  </main>
</template>
