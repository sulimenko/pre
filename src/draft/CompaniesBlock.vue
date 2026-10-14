<script setup>
import { COMPANIES, MIN } from '../data/companies'
import DraftButton from './DraftButton.vue'
const statusTone = { hot: 'available', lim: 'limited', open: 'open' }
</script>

<template>
  <section id="companies" class="section-pad companies-block">
    <div class="section-shell">
      <div class="section-heading section-heading--center">
        <p class="section-kicker">02 / ИНВЕСТИЦИОННЫЕ ВОЗМОЖНОСТИ</p>
        <h2>Что доступно сейчас</h2>
        <p>Пять Pre-IPO компаний в текущем каталоге. Изучите сектор, цену, условия участия и краткий инвестиционный тезис.</p>
      </div>
      <div class="companies-grid">
        <article v-for="company in COMPANIES" :key="company.id" class="company-card">
          <div class="company-card-top">
            <div class="company-logo"><img :src="company.logo" :alt="'Логотип ' + company.name" /></div>
            <span class="company-status" :class="'company-status--' + (statusTone[company.status] || 'open')">
              <span class="status-mark"></span>{{ company.statusText }}
            </span>
          </div>
          <div class="company-about">
            <h3>{{ company.name }}</h3>
            <p class="company-sector">{{ company.sec }}</p>
            <p class="company-why">{{ company.why }}</p>
          </div>
          <div class="company-terms">
            <div><span>Цена за акцию</span><strong>{{ company.price }}</strong></div>
            <div><span>Мин. инвестиции</span><strong>{{ MIN }}</strong></div>
          </div>
          <DraftButton label="Запросить детали" :context="'Запросить детали: ' + company.name" tone="card" arrow />
        </article>
      </div>
      <p class="data-note">* Стоимость и доступность перенесены из предыдущего макета и будут уточнены перед публикацией. Каталог рассчитан на добавление новых компаний.</p>
    </div>
  </section>
</template>
