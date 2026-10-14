<script setup>
import { computed, ref } from 'vue'
import { terminalSteps } from './siteData'
const current = ref(0)
const activeStep = computed(() => terminalSteps[current.value])
</script>

<template>
  <section id="terminal" class="section-pad terminal-block">
    <div class="section-shell">
      <div class="section-heading section-heading--center">
        <p class="section-kicker">04 / ВТОРОЙ АКТ · ПРОДУКТ</p>
        <h2>Прямой доступ и торговля через наш терминал</h2>
        <p>Мы создаём инфраструктуру, которая позволит клиентам не просто держать Pre-IPO бумаги, а работать с ними быстрее, проще и прозрачнее — прямо в экосистеме Partner Finance.</p>
        <span class="section-state">Прямая торговля Pre-IPO — запланированная функция</span>
      </div>
      <div class="terminal-layout">
        <div class="terminal-copy">
          <p class="sticky-overline">ИНТЕРАКТИВНЫЙ СЦЕНАРИЙ · 6 ШАГОВ</p>
          <div class="terminal-step-list">
            <button v-for="(step,i) in terminalSteps" :key="step.code" type="button"
              class="terminal-step" :class="{ 'terminal-step--active': current===i }"
              :aria-pressed="current===i" @click="current=i">
              <span class="terminal-step-number">{{ step.code }}</span>
              <span class="terminal-step-text"><strong>{{ step.title }}</strong><small>{{ step.detail }}</small></span>
              <span class="terminal-step-arrow" aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
        <div class="terminal-preview-sticky">
          <div class="terminal-preview">
            <div class="terminal-preview-head"><span>PBULL · MOBILE</span><span>{{ activeStep.code }} / 06</span></div>
            <div class="phone-frame terminal-phone">
              <div class="phone-island"></div>
              <div class="phone-screen">
                <div class="phone-brand">PBULL <span>PRE-IPO</span></div>
                <div class="placeholder-icon">▣</div>
                <div class="placeholder-kicker">РЕАЛЬНЫЙ СКРИНШОТ · ШАГ {{ activeStep.code }}</div>
                <strong>{{ activeStep.screenshot }}</strong>
                <p>Добавим фактический экран<br>из приложения PBull</p>
              </div>
            </div>
            <div class="terminal-preview-caption">
              <span>{{ activeStep.title }}</span>
              <p>{{ activeStep.detail }}</p>
            </div>
          </div>
          <p class="wireframe-footnote">В финале: sticky-scroll, один телефон и смена реальных экранов при прокрутке.</p>
        </div>
      </div>
    </div>
  </section>
</template>
