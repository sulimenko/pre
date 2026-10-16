<script setup>
import { COMPANIES, MIN } from '../data/companies'
import { companyDetailHref } from './preipoDetailData'
const statusTone = { hot: 'available', lim: 'limited', open: 'open' }
</script>

<template>
  <section id="companies" class="section-pad companies-block">
    <div class="section-shell">
      <div class="companies-heading-rail">
        <div class="companies-heading-stage">
          <div class="section-heading section-heading--center companies-heading">
            <p class="section-kicker">02 / ИНВЕСТИЦИОННЫЕ ВОЗМОЖНОСТИ</p>
            <h2>Что доступно сейчас</h2>
            <p>Pre-IPO компании в текущем каталоге. Изучите сектор, цену, условия участия и краткий инвестиционный тезис.</p>
            <span class="section-state">Черновые условия: цены, минимумы и статусы требуют подтверждения</span>
          </div>
        </div>
      </div>
      <div class="companies-grid">
        <a v-for="company in COMPANIES" :key="company.id" class="company-card company-card--link"
          :href="companyDetailHref(company.id)" :data-company-id="company.id" :aria-label="'Подробнее о ' + company.name">
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
            <div><span>Мин. инвестиции</span><strong>{{ company.minimum || MIN }}</strong></div>
          </div>
          <span class="draft-btn draft-btn--card">Подробнее <span aria-hidden="true">↗</span></span>
        </a>
      </div>
      <p class="data-note">* Стоимость и доступность перенесены из предыдущего макета и будут уточнены перед публикацией. Каталог рассчитан на добавление новых компаний.</p>
    </div>
  </section>
</template>

<style scoped>
.company-card--link:hover { border-color: var(--green); }
.company-card--link:focus-visible { outline: 3px solid var(--green); outline-offset: 5px; }
.company-card--link:hover .draft-btn--card { background: #e4ece5; border-color: var(--green); }
</style>
