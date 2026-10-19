<script setup>
import { computed, ref } from 'vue'
import { processScenes } from './siteData'
const active = ref(0)
const scene = computed(() => processScenes[active.value])
</script>

<template>
  <section id="process" class="section-pad process-block">
    <div class="section-shell">
      <div class="section-heading section-heading--center">
        <p class="section-kicker">06 / ПУТЬ ИНВЕСТОРА</p>
        <h2>Быстро. Прозрачно. Просто.</h2>
        <p>В PBull уже доступны удобная регистрация, быстрое совершение обычных сделок и удобный портфель.</p>
        <span class="section-state">Прямая торговля Pre-IPO появится позже</span>
      </div>
      <div class="process-switch" role="group" aria-label="Этапы инвестиционного процесса">
        <button v-for="(item,i) in processScenes" :key="item.keyword" type="button"
          :class="{ 'process-switch--active': active===i }" :aria-pressed="active===i" @click="active=i">
          <span>0{{ i+1 }}</span>{{ item.keyword }}
        </button>
      </div>
      <div class="process-stage">
        <div class="process-device-wrap">
          <div class="process-ring process-ring--one"></div><div class="process-ring process-ring--two"></div>
          <div class="phone-frame process-phone">
            <div class="phone-island"></div>
            <div class="phone-screen" aria-live="polite" aria-atomic="true">
              <div class="phone-brand">PBULL <span>USER FLOW</span></div>
              <div class="placeholder-icon">▦</div>
              <div class="placeholder-kicker">ЗАГЛУШКА · PBULL</div>
              <strong>{{ scene.screenshot }}</strong>
              <p>Здесь будет реальный экран приложения</p>
            </div>
          </div>
        </div>
        <div class="process-detail">
          <div class="process-keyword">{{ scene.keyword }}</div>
          <h3>{{ scene.heading }}</h3>
          <p>{{ scene.description }}</p>
          <div class="process-stage-list">
            <div v-for="(stage,i) in scene.stages" :key="stage" class="process-item">
              <span>{{ String(i+1).padStart(2,'0') }}</span>
              <strong>{{ stage }}</strong>
              <span class="process-check" aria-hidden="true">→</span>
            </div>
          </div>
          <p class="wireframe-footnote">Иллюстрация процесса обычных сделок, без выполнения операций. Реальные экраны и подробности проверок добавим после подтверждения.</p>
        </div>
      </div>
    </div>
  </section>
</template>
