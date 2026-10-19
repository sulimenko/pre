<script setup>
const progress = [
  { code: '01', name: 'Частная компания', note: 'Pre-IPO' },
  { code: '02', name: 'Развитие бизнеса', note: 'Private markets' },
  { code: '03', name: 'Публичный листинг', note: 'IPO' }
]
</script>

<template>
  <section id="market" class="section-pad market-block">
    <div class="section-shell">
      <div class="section-heading section-heading--center">
        <p class="section-kicker">05 / РЫНОК IPO</p>
        <h2>Путь к IPO начинается задолго до биржи</h2>
        <p>За публичным листингом стоит этап развития компании на частном рынке. Pre-IPO помогает увидеть этот путь ещё до начала биржевых торгов.</p>
      </div>
      <div class="market-timeline">
        <div v-for="(point,i) in progress" :key="point.code" class="market-stage">
          <span class="market-stage-number">{{ point.code }}</span>
          <div class="market-stage-icon">{{ i===0 ? '◈' : i===1 ? '↗' : '◎' }}</div>
          <strong>{{ point.name }}</strong><span>{{ point.note }}</span>
        </div>
      </div>
      <div class="market-showcase">
        <div class="market-showcase-heading">
          <strong>Компании и публичные размещения</strong>
          <span>Место для визуального ряда IPO-компаний</span>
        </div>
        <div class="market-logos">
          <div v-for="n in 8" :key="n" class="market-logo-placeholder">
            <span>◈</span><small>ЛОГО {{ String(n).padStart(2,'0') }}</small>
          </div>
        </div>
      </div>
      <p class="data-note">Схематичный путь компании, а не прогноз: выход на IPO не гарантирован. Подтверждённые примеры компаний и материалы добавим позже.</p>
    </div>
  </section>
</template>
