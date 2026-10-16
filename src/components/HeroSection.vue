<script setup>
import { inject } from 'vue'
import { landingActionsKey } from '../composables/landingActions'
const { openTerminal } = inject(landingActionsKey)
</script>
<template>
<header class="hero">
  <div class="wrap hero-grid">
    <div>
      <div class="kicker reveal">Pre-IPO инвестиции для тех, кто думает на год вперёд</div>
      <h1 class="h1 reveal">Инвестируйте в лидеров завтрашнего дня — <em>раньше рынка.</em></h1>
      <p class="hero-sub reveal">Покупайте акции самых перспективных частных компаний мира до их выхода на биржу — и скоро торгуйте ими в терминале Partner Finance.</p>
      <div class="cta-row reveal">
        <a class="btn btn-red" href="#companies">Смотреть доступные компании</a>
        <button class="btn btn-ghost" @click="openTerminal()">▶ Демо терминала</button>
      </div>
      <div class="hero-trust reveal">
        <div><i>§</i> Регулируемая структура</div>
        <div><i>⛨</i> Институциональная безопасность</div>
        <div><i>◎</i> Глобальный доступ</div>
      </div>
    </div>
    <div class="hero-visual">
      <div class="hero-hands"><img src="/assets/hands-terminal.png" alt="Терминал Partner Finance в руках"></div>
      <div class="hero-chip hchip1 float"><img src="/assets/polymarket.png" alt="">Polymarket<small>$170 / share</small></div>
      <div class="hero-chip hchip2 float d2"><img src="/assets/apptronik.png" alt="">Apptronik<small>$45 / share</small></div>
      <div class="hero-chip hchip3 float d3"><img src="/assets/perplexity.png" alt="">Perplexity<small>$92.40 / share</small></div>
      <div class="hero-chip hchip4 float d4">200+ IPO за год</div>
    </div>
  </div>
</header>
</template>
